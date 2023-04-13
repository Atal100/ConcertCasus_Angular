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
  
    })
    this.musicService.getMusic(this.music._id).subscribe((music) => {


      this.music = music
  

 
      this.getArtist()
      
  
    })

 
 

   
    
  }

  getArtist(){
    
    this.artistService.getArtists().subscribe(
      artists => {
      this.artists = artists

      this.musics = []
      this.music.artists.forEach((a : any) => {      
        this.artists.forEach(c => {
    
          if(a.artists == c._id){
          
            this.musics.push(c)
          }
        })
      })

     this.Subscriptionuser = this.userService.getUser(this.music.user)
      .subscribe((user) => {
   
        this.user = user;
   
      });
    })
  }

  

   

    onEditMusic(){
      this.router.navigate(["/music/" + "/edit/" + this.music._id ]);
    }
}


  


