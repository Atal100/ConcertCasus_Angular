import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ArtistComponent } from './artist/artist.component';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { ConcertComponent } from './concert/concert.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'artist', component: ArtistComponent},
  {path: 'music', component: MusicComponent},
  {path: 'concert', component: ConcertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
