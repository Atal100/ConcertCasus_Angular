import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist
  artists: Artist[]
  user: User
  load: boolean


  private Subscriptionuser: Subscription
  private params: Subscription
  private SubscriptionArtist: Subscription


  constructor(
    private router: Router,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
  ) {
    this.artist = new Artist();
  }

  ngOnInit() {
    console.log("ngOnInit called");
  
    this.params = this.route.params.subscribe(params => {
      console.log("route params:", params);
  
      this.artist._id = params['id'];
      console.log("artist ID:", this.artist._id);
  
      this.SubscriptionArtist = this.artistService.getArtist(this.artist._id)
        .subscribe((artist) => {
          console.log("artist object:", artist);
          this.artist = artist;
        
    
          console.log("artist object after:", this.artist.user);
  
          this.Subscriptionuser = this.userService.getUser(this.artist.user)
            .subscribe((user) => {
              console.log("user object:", user);
              this.user = user;
              console.log("Is nu pas klaar");
            });
        });
    });
  }

  onEditArtist() {
    console.log("Edit artist", this.artist._id);
    this.router.navigate(["/artist/" + "/edit/" + this.artist._id]);
  }






  getArtist() {
    this.artistService.getArtists().subscribe(
      artists => {
        this.artists = artists

        this.artists.forEach(c => {
          if (c._id == this.artist._id) {
            this.artist = c;


          }
        })
      });

  }

}
