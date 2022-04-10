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
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlertsComponent } from './alerts/alerts.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AlertsComponent,
    //ArtistDetailComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ArtistRoutingModule,
    ArtistModule,
    MatFormFieldModule,
    MatInputModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
