import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './artist/artist-edit/artist-edit.component';
import { ArtistModule } from './artist/artist.module';
import { ArtistRoutingModule } from './artist/artist-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ArtistModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
