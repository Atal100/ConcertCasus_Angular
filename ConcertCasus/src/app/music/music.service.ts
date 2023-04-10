import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from '../alerts/alert.service';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  musics: Music[];
  music: Music


  private MusicUrl = "http://localhost:3000/api/music/"

  constructor(private http: HttpClient, private alertService: AlertService) {

   }

   getMusics(): Observable<Music[]>{

     return this.http
     .get<Music[]>(this.MusicUrl)
     
   }

   getMusic(id: string): any {
    return this.http.get<Music>(this.MusicUrl + id)
  }

  createMusic(music: Music){

    return this.http
    .post<Music>(this.MusicUrl, music).pipe(
      map((music) => {
        this.alertService.success("You have succesfully created a Music")
        return music
      }),
      catchError((error: any) => {
        this.alertService.error(error.error.message || error.message);
        return error;
      })
    )
   }

  updateMusic(music: Music, id: string){

    return this.http.put(this.MusicUrl + music._id, music).pipe(
      map((music) => {
        this.alertService.success("You have succesfully updated a Music")
        return music
      }),
      catchError((error: any) => {
        console.log('error:', error);
        console.log('error.message:', error.message);
        console.log('error.error.message:', error.error.message);
        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }
  
  deleteMusic(id: string){
    console.log('deleteMusic ' + id)
    console.log(this.http.delete(this.MusicUrl + id))
    return this.http.delete(this.MusicUrl + id).pipe(
      map((music) => {
        this.alertService.success("You have succesfully deleted a music")
        return music
      }),
      catchError((error: any) => {
        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }
}
export interface ApiResponse{
  results: any[];
}
