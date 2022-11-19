import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {


  
  artist = new Artist();
  artists:  Artist[]
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
    private _formBuilder: FormBuilder,
    private alertService: AlertService
    ) {
      this.artistForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        genre: ['',[Validators.required]],
        country: ['', [Validators.required, Validators.minLength(4)]]
      })

      this.submitWaiting = false;

     }

  ngOnInit() {
    // this.subscription.add(this._route.params.subscribe((params) => {
    //   this.params = params
    //   if(this.params != null) {
    //     this._artistService.getArtists().subscribe(
    //       artists => {
    //       this.artists = artists
      
    //      this.artists.forEach(c => {
    //        if(c._id == this.params['id']){
    //          this.artist = c;
    //          console.log("this.Artist d" + this.artist)
    //          this.fillForm(this.artist)
    //        }
    //      })
    //       })
    //   }
    // }))
  }
  public get fields() {
    return this.artistForm.controls;
  }


  // fillForm(artist: Artist): void{
  // this.artistForm = this._formBuilder.group({
  //       name:  [artist['name']],
  //       country: [artist['country']],
  //       genre: [artist['genre']]
  //     })
  
  // }

  // onArtistSubmit(){
  //   this.subscription.add(this._route.params.subscribe((params) => {
  //     this.params = params
  //   }))
  //   this.submitWaiting = true;
  //   console.log("artist update", this.artist)
  //   if(this.artist != null){
  //   console.log(this.params.id)
  //     this.artist._id = this.params.id
  //     this.artist.name = this.artistForm.controls['name'].value;
  //     this.artist.genre = this.artistForm.controls['genre'].value;
  //     this.artist.country = this.artistForm.controls['country'].value;
  //     console.log("After add " + this.artist.name)

  //     this.subscription.add(this._artistService.updateArtist(this.artist, this.artist._id).subscribe(response =>{
  //       console.log(response)
  //       this._router.navigate(['artist/list']);
  //       this.alertService.success("Succesfully edited Artist ");
  //     }))

     
  //   }
  //   else {
      
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
