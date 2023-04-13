import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subject, Subscription, take, tap } from 'rxjs';
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
  subscription: Subscription = new Subscription;
  submitWaiting: boolean;
  user: User


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
      genre: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.minLength(4)]]
    })
    this.files = [];
    this.submitWaiting = false;

  }

  ngOnInit() {
    this.subscription = this._authService.currentUser$.subscribe(user => {
      this.user = user
    })
  }

  string = "placeholder.png"



  public get fields() {
    return this.artistForm.controls;
  }

  onFileChanged(event: any) {
    this.files = event.target.files;

    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.string = event.target.result;
      }

    }
  }





  onArtistSubmit() {
    this.submitWaiting = true;
    this.subscription = this._authService.currentUser$
    .pipe(take(1))
    .subscribe((user) => {
  
      this.user = user;
      this.artist.name = this.artistForm.controls['name'].value;
      this.artist.genre = this.artistForm.controls['genre'].value;
      this.artist.country = this.artistForm.controls['country'].value;
      this.artist.user = this.user._id;
  
      this._artistService.createArtist(this.artist).subscribe(response => {
        this._router.navigate(['artist/list'])
        this.alertService.success("Succesfully added a Artist ");
      })
    });





  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
