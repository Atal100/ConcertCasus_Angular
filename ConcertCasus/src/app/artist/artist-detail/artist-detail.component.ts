import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist 
   //artist: Artist
  private params: Subscription
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    
  ) { 
    this.artist = new Artist();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params =>{
      this.artist._id = params['id']
      
      this.getArtist();
    }
    
     
    );  
    console.log("id",this.artist)
  }

  onEditArtist(){
    this.router.navigate(["/artist/" + this.artist._id + "/edit"]);
  }

  onDeleteArtist() {
    /*this.artistService.deleteArtist(this.artist._id).subscribe(() => {
      this.getArtist();
    });
    this.router.navigate(["/artist/list"])*/
  } 
  
  getArtist(){
    this.artistService.getArtist(this.artist._id)
  }

}
