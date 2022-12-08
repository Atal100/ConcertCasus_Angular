import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { Music } from 'src/app/music/music.model';
import { MusicService } from 'src/app/music/music.service';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {

  artist: Artist
  artists: Artist[]
  music: Music
  musics: Music[]
  concert: Concert
  concerts: Concert[]

  private params: Subscription

  constructor( private router: Router,
    private artistService: ArtistService,
    private concertService: ConcertService,
    private musicService: MusicService,
    private route: ActivatedRoute,) {
      this.artist = new Artist();
      this.music = new Music();
      this.concert = new Concert();
     }

  ngOnInit() {

    this.params = this.route.params.subscribe(params =>{
      this.concert._id = params['id']
      console.log('concerts ' + this.concert._id)
  })
  this.getConcert();
}


getConcert(){
  this.concertService.getConcerts().subscribe(
    concerts => {
      this.concerts = concerts

      this.concerts.forEach(c => {
        if(c._id == this.concert._id){
          this.concert = c

          this.musicService.getMusics().subscribe(
            musics => {
              this.musics = musics

              this.musics.forEach(c => {
                if(c._id == this.concert.music.toString()){
                  this.music = c
                }
              })
            }
          )
        }
      })
    }
  )
}

getArtist(){
    
  this.artistService.getArtists().subscribe(
    artists => {
    this.artists = artists
    console.log("Test " + this.artists)

    this.artists.forEach(c => {
      console.log("c" + c)
      console.log("music artis " + this.music.artists)
      // if(c == this.music.artists){
      //   this.artist = c
      //   console.log("Tessdfadsf " + this.artist)
      // }
    })
    })
  }

  // getMusic(){
  //   this.musicService.getMusics().subscribe(
  //     musics => {
  //       this.musics = musics
        
  //       this.musics.forEach(c => {
  //         if(c._id == this.music._id){
  //           this.music = c
  //           console.log("music " + this.music.artist)
  //           // this.music.artist = this.artist._id
  //           this.artistService.getArtists().subscribe(
  //             artists => {
  //             this.artists = artists
  //             console.log("Test " + this.artists)
        
  //             this.artists.forEach(c => {
  //               console.log("c" + c._id)
  //               console.log("music artis " + this.music.artist)
  //               if(c._id == this.music.artist.toString()){
  //                 this.artist = c
  //                 console.log("Tessdfadsf " + this.artist)
  //               }
  //             })
  //             })
  //         }
  //       })

  //       this.getArtist()
  //     }
  //   )
    
  // }

  onEditConcert(){
    this.router.navigate(["/concert/" + "/edit/" + this.concert._id ]);
  }



}
