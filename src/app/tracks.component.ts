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
				{{item.id}}
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

	  this.Archive
		.subscribe(snapshots => {
   	 snapshots.forEach(snapshot => {
      console.log(snapshot.key)
      console.log('snapshot',snapshot)
			this.makeTracksArray(snapshots)
    });

		//this.makeTracksArray(this.Archive)
  })

/*
	  promise
	  .then(data => console.log('success', data))
*/

			//this.makeTracksArray(this.Archive)
		
  }
  onSelect(item: Item): void {
  	this.selectedItem = item;
  	console.log(this.selectedItem)
	};
	makeTracksArray(archive) {
		console.log('archive',archive)
		var archivedTracksArr = [];
    for( var i in archive ) {
    	archivedTracksArr.push(archive[i])
		}
		console.log('archivedTracksArr',archivedTracksArr)
		this.archivedTracksArr = archivedTracksArr.sort()
	}
	
}



