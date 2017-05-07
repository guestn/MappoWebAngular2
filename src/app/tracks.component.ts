import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Item } from './item';
import { TrackDetailComponent } from './track-detail.component';


@Component({
  selector: 'tracks',
  template: `
  	<section class="tracks-selector">
  	<h2>Tracks</h2>
			<a class="text" *ngFor="let item of archivedTracksArr"
				(click)="onSelect(item)"
  			[class.selected]="item === selectedItem"
  			class="button display--block"
				>
				{{unixTimeToString(item.id)}}
			</a>
		</section>
		<track-detail [item]="selectedItem" ></track-detail>

	`,
	styles: [`
	.selected {
		opacity: 0.7
	}
  `],
  styleUrls: ['./app.component.css']

	//providers: [ItemService]

})


export class TracksComponent {
	
	constructor(db: AngularFireDatabase) {
	  this.Archive = db.list('/Archive');
	  this.Archive.subscribe(snapshots => {
	   	 snapshots.forEach(snapshot => {
				this.makeTracksArray(snapshots);
	    });
	  })
  }
  
  title = 'Tracks';
	items: Item[];
	selectedItem: Item;
	Archive: FirebaseListObservable<any[]>;
	archivedTracksArr: object;

  onSelect(item: Item): void {
  	this.selectedItem = item;
  	console.log(this.selectedItem)
	}
	
	makeTracksArray(archive): void {
		let archivedTracksArr = [];
    for( var i in archive ) {
    	archivedTracksArr.push(archive[i]);
		}
		this.archivedTracksArr = archivedTracksArr.sort();
	}
	
	unixTimeToString(unixTime: string) {
		let dateObj = new Date(unixTime);
		let year = dateObj.getUTCFullYear();
		let month = dateObj.getUTCMonth() + 1;
		let day = dateObj.getUTCDate();
		return day + '-' + month + '-' + year;
	}
	
}



