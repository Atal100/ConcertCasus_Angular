import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
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
  user: User
  musics: Artist[]
  private params: Subscription
  Subscriptionuser: Subscription;

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService) {
      this.artist = new Artist();
      this.music = new Music();
     }

  ngOnInit(){
    this.params = this.route.params.subscribe(params =>{
      this.music._id = params['id']
      console.log("params" + params['id'])
    })
    this.musicService.getMusic(this.music._id).subscribe((music) => {
      console.log("Music ", music);
      console.log("Music ", music.artists);

      this.music = music
  

     
      console.log("Music " + this.music.artists);
      this.getArtist()
      
  
    })

 
 

   
    
  }

  getArtist(){
    
    this.artistService.getArtists().subscribe(
      artists => {
      this.artists = artists
      console.log("Music2222222222 " , this.artists);
      console.log("Music2232222222 " , this.music.artists);
      this.musics = []
      this.music.artists.forEach((a : any) => {      
        this.artists.forEach(c => {
          console.log("Music2 " , a.artists);
          console.log("Music3 " , c);
          if(a.artists == c._id){
          
            this.musics.push(c)
          }
        })
      })
     console.log("Musics", this.musics)
     this.Subscriptionuser = this.userService.getUser(this.music.user)
      .subscribe((user) => {
        console.log("user object:", user);
        this.user = user;
        console.log("Is nu pas klaar");
      });
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


  


