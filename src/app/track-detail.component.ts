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
  		{{unixTimeToString(item.id)}}
  		pointsCount: {{ pointsCount }}
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
		//console.log(this.parsedCurrentTrack[0]);
		this.pointsCount = this.parsedCurrentTrack.length;
		//drawMap(parsedCurrentTrack);
		
		this.lat = parseFloat(this.parsedCurrentTrack[0][1])
		this.lon = parseFloat(this.parsedCurrentTrack[0][0])
		console.log('this.lat',this.lat)

	}
	private unixTimeToString(unixTime) {
		var dateObj = new Date(unixTime);
		var year = dateObj.getUTCFullYear();
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		return day + '-' + month + '-' + year;
	}

		
}



