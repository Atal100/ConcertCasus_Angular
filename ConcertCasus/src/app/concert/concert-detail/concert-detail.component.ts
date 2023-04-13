import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Music } from 'src/app/music/music.model';
import { MusicService } from 'src/app/music/music.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
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
  concert: Concert
  concerts: Artist[]
  user: User

  private params: Subscription
  Subscriptionuser: Subscription;

  constructor( private router: Router,
    private artistService: ArtistService,
    private concertService: ConcertService,
    private userService: UserService,
    public authService: AuthService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,) {
      this.artist = new Artist();

      this.concert = new Concert();
     }

  ngOnInit() {

    this.params = this.route.params.subscribe(params =>{
      this.concert._id = params['id']
     
  })
  this.concertService.getConcert(this.concert._id).subscribe((concert) => {


    this.concert = concert
    
    const formattedDate = this.datePipe.transform(this.concert.date, 'yyyy-MM-dd');
    this.concert.date = new Date(formattedDate)
    this.getArtist()
    

  })

}




getArtist(){
    
  this.artistService.getArtists().subscribe(
    artists => {
    this.artists = artists
    
    this.concerts = []
    this.concert.artists.forEach((a : any) => {      
      this.artists.forEach(c => {
    
        if(a.artists == c._id){
        
          this.concerts.push(c)
        }
      })
    })
 
   this.Subscriptionuser = this.userService.getUser(this.concert.user)
    .subscribe((user) => {
   
      this.user = user;
    
    });
  })
}
  onEditConcert(){
    this.router.navigate(["/concert/" + "/edit/" + this.concert._id ]);
  }



}
