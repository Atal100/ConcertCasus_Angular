import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subject, Subscription } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';
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
  public files: any[];

 


  constructor(
    private _router: Router,
    private _artistService: ArtistService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private alertService: AlertService
    ) {
      this.artistForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        genre: ['',[Validators.required]],
        country: ['', [Validators.required, Validators.minLength(4)]]
      })
      this.files = [];
      this.submitWaiting = false;

     }

  ngOnInit() {
  
  }

  string = "placeholder.png"

 

  public get fields() {
    return this.artistForm.controls;
  }

  onFileChanged(event: any) {
    this.files = event.target.files;

    if(event.target.files){
           var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0])
           reader.onload=(event: any) => {
             this.string = event.target.result;
           }
    
         }
  }

  



  onArtistSubmit(){
    this.submitWaiting = true;
    console.log("artist new", this.artist)
  
        const artist = new Artist();

      artist.name = this.artistForm.controls['name'].value;
      artist.genre = this.artistForm.controls['genre'].value;
      artist.country = this.artistForm.controls['country'].value;
      
       
    
      console.log("artist new 2 ", artist)

    
      this._artistService.createArtist(artist).subscribe(response =>{
        console.log(response)
        this._router.navigate(['artist/list'])
        this.alertService.success("Succesfully added a Artist ");
      })
    

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
