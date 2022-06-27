import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  musics: Music[];
  music: Music


  private MusicUrl = "http://localhost:3000/api/music/"

  constructor(private http: HttpClient) {
    console.log("MusicService constructed");
    console.log("Connected to" + this.MusicUrl);
   }

   getMusics(): Observable<Music[]>{
     console.log('getMusics')

     return this.http
     .get<Music[]>(this.MusicUrl)
     .pipe(map(musics => musics.map((music) => new Music(music))))
   }

   getMusic(id: string): Observable<Music> {
    console.log('getMusic ' + this.MusicUrl + id)
    console.log('https' + this.http
      .get<Music>(this.MusicUrl + id))

    return this.http.get<Music>(this.MusicUrl + id)
  }

  createMusic(music: Music){
    console.log('createMusic')

    return this.http
    .post<Music>(this.MusicUrl, music)
   }

  updateMusic(music: Music, id: string){
    console.log('updateMusic')
    console.log(id);
    return this.http.put(this.MusicUrl + music._id, music);
  }
  
  deleteMusic(id: string){
    console.log('deleteMusic ' + id)
    console.log(this.http.delete(this.MusicUrl + id))
    return this.http.delete(this.MusicUrl + id);
  }
}
export interface ApiResponse{
  results: any[];
}
