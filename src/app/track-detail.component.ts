import { Component, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//import * as L from 'mapbox.js';

import { AgmCoreModule } from '@agm/core';

import { Item } from './item';




@Component({
  selector: 'track-detail',
  template: `
  	<div *ngIf="item">

  		<h2>Track Detail</h2>
  		<div class="card">
  			<div id="info" class="card-section">
  			  date: {{unixTimeToString(item.id)}}
					pointsCount: {{ pointsCount }}
					trackDistance: {{getTrackDistance()}}m
  			</div>
  		</div>


			<agm-map 
				[latitude]="lat" 
				[longitude]="lon"
				[zoom]="zoom"
				style="height:500px">
				 <agm-polyline >
				 	<agm-polyline-point [latitude]="point[1]" [longitude]="point[0]" *ngFor="let point of parsedCurrentTrack">
				 	</agm-polyline-point>
				 </agm-polyline>
				 <agm-marker [latitude]="lat" [longitude]="lon" [label]="'S'"></agm-marker>
				 <agm-marker [latitude]="parsedCurrentTrack[parsedCurrentTrack.length-1][1]" [longitude]="parsedCurrentTrack[parsedCurrentTrack.length-1][0]" [label]="'E'"></agm-marker>

			</agm-map>
  	</div>


	`,
	styles: [`
  `]
	//providers: [ItemService]
})


export class TrackDetailComponent {
  title = 'Track Detail';
  @Input() item: Item[];
	parsedCurrentTrack: Array<any>;
	pointsCount: number;
  lat: number;
  lon: number;
  zoom: number = 14;
  
  ngOnChanges() {
	  this.parseData(this.item)

    //console.log('Changed', changes.item.currentValue, changes.item.previousValue);

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
		var dateObj = new Date(unixTime);
		var year = dateObj.getUTCFullYear();
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		return day + '-' + month + '-' + year;
	}
	
	//Haversine formula: http://www.movable-type.co.uk/scripts/latlong.html
	distanceBetweenTwoPoints(point1, point2) {
		var lon1 = point1[0], lat1 = point1[1],
				lon2 = point2[0], lat2 = point2[1]
		var R = 6371e3; // metres
		var φ1 = this.toRadians(lat1);
		var φ2 = this.toRadians(lat2);
		var Δφ = this.toRadians(lat2-lat1);
		var Δλ = this.toRadians(lon2-lon1);
		
		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		        Math.cos(φ1) * Math.cos(φ2) *
		        Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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
		
}



