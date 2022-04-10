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
    this.subscription = this._route.paramMap
    .pipe(
      tap(console.log),
      switchMap((params: ParamMap) => {
        if(!params.get('id')){
          return of({
            name: '',
            genre: '',
            image: ''
          });
        } else {
          return this._artistService.getArtist(params.get('id') as string);
          
        }
      }),
      tap(console.log)
    )
    .subscribe((artist) => {
      this.artist = artist;
    })
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params;
      console.log("params",)
      this._artistService.getArtist(params['id']).subscribe((artist) => {
        this.artist = artist;
        if(artist !=null) {
          this.artistForm = this._formBuilder.group({
            name: [artist['name'], [Validators.required]],
            genre: [artist['genre'], [Validators.required]],
            image: [artist['image'], [Validators.required]]
          })
        }
      })
    }))
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
      const artist = new Artist();

      artist.name = this.artistForm.controls['name'].value;
      artist.genre = this.artistForm.controls['genre'].value;
      artist.image = this.artistForm.controls['image'].value;

      this.subscription.add(this._artistService.createArtist(artist).subscribe());
      this._router.navigate(['artist/list'])
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
