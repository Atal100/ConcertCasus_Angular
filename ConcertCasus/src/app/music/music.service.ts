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


  private MusicUrl = "https://concertcasus.onrender.com/api/music/"

  constructor(private http: HttpClient, private alertService: AlertService) {

   }

   getMusics(): Observable<Music[]>{

     return this.http
     .get<Music[]>(this.MusicUrl)
     
   }

   getMusic(id: string): Observable<Music> {
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

        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }
  
  deleteMusic(id: string){

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
