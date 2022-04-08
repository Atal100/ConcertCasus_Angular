import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MusicComponent } from './music/music.component';
import { MartistComponent } from './martist/martist.component';
import { MconcertComponent } from './mconcert/mconcert.component';
import { MticketComponent } from './mticket/mticket.component';
import { MuserComponent } from './muser/muser.component';
import { UserComponent } from './user/user.component';
import { ArtistComponent } from './artist/artist.component';
import { TicketComponent } from './ticket/ticket.component';
import { ConcertComponent } from './concert/concert.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    MusicComponent,
    MartistComponent,
    MconcertComponent,
    MticketComponent,
    MuserComponent,
    UserComponent,
    ArtistComponent,
    TicketComponent,
    ConcertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
