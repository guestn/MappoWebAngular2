import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AgmCoreModule } from '@agm/core';

import { Item } from './item';




@Component({
  selector: 'track-detail',
  template: `
  	<section *ngIf="item" class="track-detail">

  		<h2>Track Detail</h2>
  		<div class="card">
  			<div id="info" class="card-section">
  			  date: {{unixTimeToString(item.id)}};
					pointsCount: {{ pointsCount }};
					trackDistance: {{getTrackDistance()}}m
  			</div>
  		</div>

			<agm-map 
				[latitude]="lat" 
				[longitude]="lon"
				[zoom]="zoom"
				[styles]="mapStyles"
				style="height:500px">
					<agm-polyline  strokeColor = "#ff8800">
				 		<agm-polyline-point [latitude]="point[1]" [longitude]="point[0]" *ngFor="let point of parsedCurrentTrack">
				 		</agm-polyline-point>
				 	</agm-polyline>
				<agm-marker [latitude]="lat" [longitude]="lon" [label]="'S'"></agm-marker>
				<agm-marker [latitude]="parsedCurrentTrack[parsedCurrentTrack.length-1][1]" [longitude]="parsedCurrentTrack[parsedCurrentTrack.length-1][0]" [label]="'E'"></agm-marker>
			</agm-map>
			
  	</section>


	`,
	styles: [`
  `],
  styleUrls: ['./app.component.css']

	//providers: [ItemService]
})



export class TrackDetailComponent implements OnInit {
  title = 'Track Detail';
  @Input() item: Item[];
	parsedCurrentTrack: Array<any>;
	pointsCount: number;
  lat: number;
  lon: number;
  zoom: number = 16;
  
  ngOnChanges() {
	  this.parseData(this.item)
  }
  
  ngOnInit() {
	  this.lat = 10;
	  this.lon = 50;
  }

	parseData(item): void {
		let points = item.points;
		this.parsedCurrentTrack = []
		for( var i in points ) {
    	this.parsedCurrentTrack.push([points[i].point.coords.longitude, points[i].point.coords.latitude])
		}
		this.pointsCount = this.parsedCurrentTrack.length;
		this.lat = parseFloat(this.parsedCurrentTrack[0][1])
		this.lon = parseFloat(this.parsedCurrentTrack[0][0])
		console.log('this.lat',this.lat)
	}
	
	public unixTimeToString(unixTime) {
		let dateObj = new Date(unixTime);
		let year = dateObj.getUTCFullYear();
		let month = dateObj.getUTCMonth() + 1;
		let day = dateObj.getUTCDate();
		return day + '-' + month + '-' + year;
	}
	
	//Haversine formula: http://www.movable-type.co.uk/scripts/latlong.html
	distanceBetweenTwoPoints(point1, point2) {
		let lon1 = point1[0], lat1 = point1[1],
				lon2 = point2[0], lat2 = point2[1]
		let R = 6371e3; // earth radius in metres
		let φ1 = this.toRadians(lat1);
		let φ2 = this.toRadians(lat2);
		let Δφ = this.toRadians(lat2-lat1);
		var Δλ = this.toRadians(lon2-lon1);
		
		let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		        Math.cos(φ1) * Math.cos(φ2) *
		        Math.sin(Δλ/2) * Math.sin(Δλ/2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return  R * c;
	}
	
	toRadians(x) {
   return x * Math.PI / 180;
	}
	
	getTrackDistance() {
		let trackDistance = 0;
		for (let i=0; i<this.pointsCount-1; i++) {
			trackDistance += this.distanceBetweenTwoPoints(this.parsedCurrentTrack[i], this.parsedCurrentTrack[i+1])
		}
		return trackDistance.toFixed(1)
	}
	
	public mapStyles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"labels.text.fill","stylers":[{"color":"#b43b3b"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"lightness":"8"},{"color":"#bcbec0"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5b5b5b"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7cb3c9"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#abb9c0"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"color":"#fff1f1"},{"visibility":"off"}]}]
		
	
	
}




