import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { Item } from './item';
import { TrackDetailComponent } from './track-detail.component';
/*
  	  <ul>
				<li class="text" *ngFor="let item of Archive | async"
				(click)="onSelect(item)"
  			[class.selected]="item === selectedItem"
				>
				{{item.id}}
			</li>
		</ul>
*/

@Component({
  selector: 'tracks',
  template: `
  	<h2>Tracks</h2>

		<ul>
				<li class="text" *ngFor="let item of archivedTracksArr"
				(click)="onSelect(item)"
  			[class.selected]="item === selectedItem"
				>
				{{unixTimeToString(item.id)}}
			</li>
		</ul>
		<track-detail [item]="selectedItem" ></track-detail>
  	
	`,

	styles: [`
	.selected {
		color: green
	}
  `],
	//providers: [ItemService]

})


export class TracksComponent {
  title = 'Tracks';
	items: Item[];
	selectedItem: Item;
	Archive: FirebaseListObservable<any[]>;
	archivedTracksArr: object;
  constructor(db: AngularFireDatabase) {
	  this.Archive = db.list('/Archive');

	  this.Archive.subscribe(snapshots => {
	   	 snapshots.forEach(snapshot => {
				this.makeTracksArray(snapshots)
	    });
	  })
  }
  onSelect(item: Item): void {
  	this.selectedItem = item;
  	console.log(this.selectedItem)
	};
	makeTracksArray(archive): void {
		let archivedTracksArr = [];
    for( var i in archive ) {
    	archivedTracksArr.push(archive[i])
		}
		this.archivedTracksArr = archivedTracksArr.sort()
	}
	public unixTimeToString(unixTime) {
		var dateObj = new Date(unixTime);
		var year = dateObj.getUTCFullYear();
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		return day + '-' + month + '-' + year;
	}

	
}



