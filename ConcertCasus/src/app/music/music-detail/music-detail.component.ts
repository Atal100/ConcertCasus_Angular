import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { Music } from '../music.model';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css']
})
export class MusicDetailComponent implements OnInit {

  artist: Artist
  artists: Artist[]
  music: Music
  private params: Subscription

  constructor(    private router: Router,
    private artistService: ArtistService,
    private musicService: MusicService,
    private route: ActivatedRoute,) {
      this.artist = new Artist();
      this.music = new Music();
     }

  ngOnInit(){
    this.params = this.route.params.subscribe(params =>{
      this.music._id = params['id']
      console.log("params" + params['id'])
    })
    this.musicService.getMusic(this.music._id).subscribe((c: any) => {

      this.music = <Music>c.music
      console.log(c.music.artists + " astsadt")
      c.music.artists.forEach((a: any) => {
        console.log(a._id)
      })

  
    })

   this.getArtist()
 

    
  }

  getArtist(){
    
    this.artistService.getArtists().subscribe(
      artists => {
      this.artists = artists
    })
  }

  

    

    // getMusic(){
    //   this.musicService.getMusics().subscribe(
    //     musics => {
    //       this.musics = musics
          
    //       this.musics.forEach(c => {
    //         if(c._id == this.music._id){
    //           this.music = c
    //           console.log("music " + this.music.artists)
        
    //           this.artistService.getArtists().subscribe(
    //             artists => {
    //             this.artists = artists
    //             console.log("Test " + this.artists)
          
    //             this.artists.forEach(c => {
    //               console.log("c" + c._id)
    //               console.log("music artis " + this.music.artists)
    //               if(c._id == this.music.artists.toString()){
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

    onEditMusic(){
      this.router.navigate(["/music/" + "/edit/" + this.music._id ]);
    }
}


  


