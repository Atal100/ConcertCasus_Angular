import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Music } from 'src/app/music/music.model';
import { MusicService } from 'src/app/music/music.service';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concert-new',
  templateUrl: './concert-new.component.html',
  styleUrls: ['./concert-new.component.css']
})
export class ConcertNewComponent implements OnInit {
 
  concert = new Concert();

  artists: Artist[];
  musics: Music[];
  private _loading: boolean;
  private _error: boolean;
  subscription: Subscription = new Subscription;
  submitWaiting: boolean;
  currentDate: any = new Date();

  protected onDestroy = new Subject<void>();

  concertForm: FormGroup
  params: Params;

  constructor(
    private _router: Router,
    private _musicService: MusicService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _artistService: ArtistService,
    private _concertService: ConcertService,
    private _authService: AuthService,
    private alertService: AlertService

  ) {
    this.concertForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      artists: this._formBuilder.array([]),
      adres: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', [Validators.required]]
    })
    this.submitWaiting = false;
   }

  ngOnInit() {
    this.getArtists();
    this.addArtist();
  }

  public get fields() {
    return this.concertForm.controls;
  }


  public get newartist() {
    return this.concertForm.controls["artists"] as FormArray
  }

  addArtist(){
    const artistForm = this._formBuilder.group({
      artists: ['',[Validators.required]],
    });

    this.newartist.push(artistForm); 

  }
  deleteArtist(artistIndex: number) {
    this.newartist.removeAt(artistIndex);
}

  onConcertSubmit(){
    this.submitWaiting = true;

    const concert = new Concert();
    concert.artists = [];
    concert.name = this.concertForm.controls['name'].value;
    concert.adres = this.concertForm.controls['adres'].value;
    concert.date = this.concertForm.controls['date'].value;
    concert.artists = this.concertForm.controls['artists'].value;
    this._authService.getUserFromLocalStorage().subscribe(user => {
      concert.user = user._id
    })

    this._concertService.createConcert(concert).subscribe(response => {
      this._router.navigate(['concert/list'])
      this.alertService.success("Succesfully added Concert ");
    })
  }

  getArtists(): any{
    this._artistService.getArtists().subscribe(
      
      artists => {
        console.log("artisten" + artists)
        this.artists = artists;
        this._loading = false
      }
      
    )
  }

}
