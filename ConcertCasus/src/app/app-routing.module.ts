import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ArtistComponent } from './artist/artist.component';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { ConcertComponent } from './concert/concert.component';
import { ArtistListComponent } from './artist/artist-list/artist-list.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'music', component: MusicComponent},
  {path: 'concert', component: ConcertComponent},
  //{path: 'login', component: LoginComponent},
  //{path: 'register', component: Registercomponent}
  { path: "", redirectTo: "dashboard", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
