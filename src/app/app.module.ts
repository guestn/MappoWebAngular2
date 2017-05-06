import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { TracksComponent } from './tracks.component';
import { TrackDetailComponent } from './track-detail.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    TracksComponent,
    TrackDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjhXcpJNQKzXTkkNbCOSB7N0qhYkoSlWg'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
