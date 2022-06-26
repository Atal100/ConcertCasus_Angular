import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-new',
  templateUrl: './artist-new.component.html',
  styleUrls: ['./artist-new.component.css']
})
export class ArtistNewComponent implements OnInit {



  
  artist = new Artist();
  subscription:  Subscription = new Subscription;
  submitWaiting: boolean;

  protected onDestroy = new Subject<void>();

  //Form
  artistForm: FormGroup
  params: Params;

 


  constructor(
    private _router: Router,
    private _artistService: ArtistService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder
    ) {
      this.artistForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        genre: ['',[Validators.required]],
        image: ['', [Validators.required]]
      })

      this.submitWaiting = false;

     }

  ngOnInit() {
  
  }

  onArtistSubmit(){
    this.submitWaiting = true;
    console.log("artist new", this.artist)
  
        const artist = new Artist();

      artist.name = this.artistForm.controls['name'].value;
      artist.genre = this.artistForm.controls['genre'].value;
      artist.image = this.artistForm.controls['image'].value;

      this._artistService.createArtist(artist).subscribe(response =>{
        console.log(response)
        this._router.navigate(['artist/list'])
      })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
