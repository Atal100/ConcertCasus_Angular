import { DatePipe } from '@angular/common';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {
  artists: Artist[];
  music: Music
  musics: Music[]
  concert: Concert;
  concerts: Concert[];
  private _loading: boolean;
  private _error: boolean;
  subscription: Subscription = new Subscription;
  submitWaiting: boolean;

  protected onDestroy = new Subject<void>();

  concertForm: FormGroup
  params: Params;
  
  constructor(
    private _router: Router,
    private datePipe: DatePipe,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _artistService: ArtistService,
    private _concertService: ConcertService,
    private alertService: AlertService,
    private _authService: AuthService

  ) {
    this.concertForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      artists: this._formBuilder.array([]),
      date: ['', [Validators.required]],
      adres: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.submitWaiting = false;
   }

  ngOnInit(){
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params

      if(this.params != null){
        this._concertService.getConcerts().subscribe(
          concerts => {
            this.concerts = concerts

            this.concerts.forEach(c => {
              if(c._id == this.params['id']){
                this.concert = c
                this.fillForm(this.concert)
              }
            })

            this.getArtist()
          }
        )
      }
    }))

  }

  public get fields() {
    return this.concertForm.controls;
  }

  public get newartist() {
    return this.concertForm.controls["artists"] as FormArray
  }

  addArtist() {
    const artistForm = this._formBuilder.group({
      artists: ['', [Validators.required]],
    });

    this.newartist.push(artistForm);

  }
  deleteArtist(artistIndex: number) {
    this.newartist.removeAt(artistIndex);
  }


  fillForm(concert:Concert){
  
    const formattedDate = this.datePipe.transform(concert.date, 'yyyy-MM-dd');
    this.concertForm = this._formBuilder.group({
      name: [concert['name']],
      artists: this._formBuilder.array([]),
      date: [formattedDate],
      adres: [concert['adres']]
    })

    const artistFormArray = this.concertForm.get("artists") as FormArray
    var i = 0;
    concert['artists'].forEach((c: any)=> {

    
     const formGroup = this._formBuilder.group({
        artists: [c.artists, Validators.required]
      })
    
      artistFormArray.push(formGroup);

     
     
      i++;
    });
  }

  onConcertSubmit(){
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params
    }))
    this.submitWaiting = true;

    if(this.concert != null){

      this.concert._id = this.params.id
      this.concert.name = this.concertForm.controls['name'].value;
      this.concert.artists = this.concertForm.controls['artists'].value;
      this.concert.adres = this.concertForm.controls['adres'].value;
      this.concert.date = this.concertForm.controls['date'].value
      this._authService.getUserFromLocalStorage().subscribe(user => {
        this.concert.user = user._id
      })

      this.subscription.add(this._concertService.updateConcert(this.concert, this.concert._id).subscribe(response =>{
     
        this._router.navigate(['concert/list']);
        this.alertService.success("Succesfully edited concert ");
      }))

     
    }
    else {
      
    }
  }

 
  getArtist() {

    this._artistService.getArtists().subscribe(
      artists => {
        this.artists = artists
     
      })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}


}
