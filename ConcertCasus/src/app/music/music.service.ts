import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from '../alerts/alert.service';
import { Artist } from '../artist/artist.model';
import { Music } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  artistss: Artist[] = [
    {
      "_id": "AD1",
      "name": "50 Cent",
    },
    {
      "_id": "AD2",
      "name": "Kanye West",
    },
    {
      "_id": "AD3",
      "name": "Maroon 5",
    },
    {
      "_id": "AD4",
      "name": "Katy Perry",
    },
    {
      "_id": "AD5",
      "name": "Bruno Mars",
    }
  ]
  musics: Music[] = [
    {
      "_id": "Id1",
      "name": "CandyShop",
      "genre": "Hiphop",
      "duration": 4,
      "country": "United States",
      "artists": []
      
    },
    {
      "_id": "Id2",
      "name": "Power",
      "genre": "Hiphop",
      "duration": 4,
      "country": "United States",
      "artists": []
    },
    {
      "_id": "Id3",
      "name": "Sugar",
      "genre": "Rock",
      "duration": 4,
      "country": "United States",
      "artists": []
    },
    {
      "_id": "Id4",
      "name": "Dark Horse",
      "genre": "Pop",
      "duration": 4,
      "country": "United States",
      "artists": []
    },
    {
      "_id": "Id5",
      "name": "Sweet",
      "genre": "Pop",
      "duration": 4,
      "country": "United States",
      "artists": [
        {"_id": "Id6", 
        "name": "Henk"},
      ]
    }
  ];
  music: Music


  private MusicUrl = "http://localhost:3000/api/music/"

  constructor(private http: HttpClient, private alertService: AlertService) {
    console.log("MusicService constructed");
    console.log("Connected to" + this.MusicUrl);
   }

   getMusics(): Music[]{
     console.log('getMusics')

    //   this.http
    //  .get<Music[]>(this.MusicUrl)
    //  .pipe(map(musics => musics.map((music) => new Music(music))))

     return this.musics;
   }

   getMusic(id: string) : Music {
    // console.log('getMusic ' + this.MusicUrl + id)
    // console.log('https' + this.http
    //   .get<Music>(this.MusicUrl + id))

    //  this.http.get<Music>(this.MusicUrl + id)

    this.musics.forEach(c =>{
      if(c._id === id){
        console.log('servicemusic ' + c.name);
        this.music = c
        return c

      }
      console.log('test')
      return undefined
    })
  return this.music;
 
  }

  createMusic(music: Music){
    console.log('createMusic')
    this.musics.push(music)
    return music

    // return this.http
    // .post<Music>(this.MusicUrl, music).pipe(
    //   map((music) => {
    //     this.alertService.success("You have succesfully created a Song")
    //     return music
    //   }),
    //   catchError((error: any) => {
    //     console.log('error:', error);
    //     console.log('error.message:', error.message);
    //     console.log('error.error.message:', error.error.message);
    //     this.alertService.error(error.error.message || error.message);
    //     return of(undefined);
    //   })
    // )
   }

  updateMusic(music: Music, id: string){

    this.musics.forEach(c =>{
      if(c._id === id){
        c = music;
        return c

      }
      return c
    })
    
    // console.log('updateMusic')
    // console.log(id);
    // return this.http.put(this.MusicUrl + music._id, music).pipe(
    //   map((music) => {
    //     this.alertService.success("You have succesfully updated a Song")
    //     return music
        
    //   }),
    //   catchError((error: any) => {
    //     console.log('error:', error);
    //     console.log('error.message:', error.message);
    //     console.log('error.error.message:', error.error.message);
    //     this.alertService.error(error.error.message || error.message);
    //     return of(undefined);
    //   })
    // )
  }
  
  deleteMusic(id: string){

    for(let i = 0; i < this.musics.length; i++){
      if(this.musics[i]._id === id){
        this.musics.splice(i, 1);

    }
    }
  }

  //   console.log('deleteMusic ' + id)
  //   console.log(this.http.delete(this.MusicUrl + id))
  //   return this.http.delete(this.MusicUrl + id).pipe(
  //     map((music) => {
  //       this.alertService.success("You have succesfully deleted a Song")
  //       return music
  //     }),
  //     catchError((error: any) => {
  //       console.log('error:', error);
  //       console.log('error.message:', error.message);
  //       console.log('error.error.message:', error.error.message);
  //       this.alertService.error(error.error.message || error.message);
  //       return of(undefined);
  //     })
  //   )
  // }
}

export interface ApiResponse{
  results: any[];
}
  
