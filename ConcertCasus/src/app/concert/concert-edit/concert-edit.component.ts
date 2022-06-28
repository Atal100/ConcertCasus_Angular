import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
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
    private _musicService: MusicService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _artistService: ArtistService,
    private _concertService: ConcertService

  ) {
    this.concertForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      music: ['',[Validators.required]],
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
          }
        )
      }
    }))
    this.getMusic()
  }

  public get fields() {
    return this.concertForm.controls;
  }

  fillForm(concert:Concert){
    this.concertForm = this._formBuilder.group({
      name: [concert['name']],
      music: [concert['music']],
      date: [concert['date']],
      adres: [concert['adres']]
    })
  }

  onConcertSubmit(){
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params
    }))
    this.submitWaiting = true;
    console.log("concert update", this.concert)
    if(this.concert != null){
    console.log(this.params.id)
      this.concert._id = this.params.id
      this.concert.name = this.concertForm.controls['name'].value;
      this.concert.music = this.concertForm.controls['music'].value;
      this.concert.adres = this.concertForm.controls['adres'].value;
      this.concert.date = this.concertForm.controls['date'].value
      console.log("After add " + this.concert.name)

      this.subscription.add(this._concertService.updateConcert(this.concert, this.concert._id).subscribe(response =>{
        console.log(response)
        this._router.navigate(['concert/list']);
      }))

     
    }
    else {
      
    }
  }

  getMusic(){
    this._musicService.getMusics().subscribe(
      musics => {
        this.musics = musics

        this.musics.forEach(c => {
          if(c._id == this.concert._id){
            this.music = c
          }
        })
      }
    )

    
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}


}
