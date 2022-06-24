import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {


  
  artist = new Artist();
  subscription:  Subscription = new Subscription;
  submitWaiting: boolean;

  protected onDestroy = new Subject<void>();

  genres = [
    { genre: "Techno" },
    { genre: "Dupstep" },
    { genre: "Rock" },
    { genre: "Punk" },
    { genre: "Classic"},
    { genre: "HipHop"}
  ];



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
    this.fillForm();
  }

  fillForm(): void{
    this._route.paramMap
    .pipe(
      tap(console.log),
      switchMap((params: ParamMap) => {
          return this._artistService.getArtist(params.get('id') as string);

      }),
      tap(console.log)
    )
    .subscribe((artist) => {
      this.artist = artist;
      console.log(this.artist)
    })
    
  }

  onArtistSubmit(){
    this.submitWaiting = true;
    console.log("artist update", this.artist)
    if(this.artist != null){
      this.artist.name = this.artistForm.controls['name'].value;
      this.artist.genre = this.artistForm.controls['genre'].value;
      this.artist.image = this.artistForm.controls['image'].value;

      this.subscription.add(this._artistService.updateArtist(this.artist).subscribe())
      this._router.navigate(['artist/list']);
    }
    else {
      
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
