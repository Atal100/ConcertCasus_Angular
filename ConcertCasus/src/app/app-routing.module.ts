import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ArtistComponent } from './artist/artist.component';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { ConcertComponent } from './concert/concert.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsecasesComponent } from './about/usercases/usecases.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},

  {path: 'about', component: UsecasesComponent},
  {path: 'music', component: MusicComponent},
  {path: 'concert', component: ConcertComponent},


  //Authenticatie
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},


  { path: "", redirectTo: "dashboard", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
