import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Music } from '../music.model';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-edit',
  templateUrl: './music-edit.component.html',
  styleUrls: ['./music-edit.component.css']
})
export class MusicEditComponent implements OnInit {

  artists: Artist[];
  music: Music
  musics: Music[]
  private _loading: boolean;
  private _error: boolean;
  subscription: Subscription = new Subscription;
  submitWaiting: boolean;

  protected onDestroy = new Subject<void>();

  musicForm: FormGroup
  params: Params;

  constructor(
    private _router: Router,
    private _musicService: MusicService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _artistService: ArtistService,
    private alertService: AlertService,
    private _authService: AuthService

  ) {
    this.musicForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      artists: this._formBuilder.array([]),
      duration: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      country: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.submitWaiting = false;
  }

  ngOnInit() {
    
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params
      
      if (this.params != null) {
        this._musicService.getMusics().subscribe(
          musics => {
            this.musics = musics

            this.musics.forEach(c => {
              if (c._id == this.params['id']) {
                this.music = c
             
             
                this.fillForm(this.music)
              }
            })
         
            this.getArtist()
      
          }
        )
      }
    }))
  

  }

  public get fields() {
    return this.musicForm.controls;
  }
  public get newartist() {
    return this.musicForm.controls["artists"] as FormArray
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

  fillForm(music: Music): void {
    this.musicForm = this._formBuilder.group({
      name: [music['name']],
      country: [music['country']],
      duration: [music['duration']],
      artists: this._formBuilder.array([])
    })
    const artistFormArray = this.musicForm.get("artists") as FormArray
    var i = 0;
    music['artists'].forEach((c: any)=> {

    
     const formGroup = this._formBuilder.group({
        artists: [c.artists, Validators.required]
      })
    
      artistFormArray.push(formGroup);

     
      
      i++;
    });
  }

  onMusicSubmit() {
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params
    }))
    this.submitWaiting = true;

    if (this.music != null) {
      this.music._id = this.params.id
      this.music.name = this.musicForm.controls['name'].value;
      this.music.duration = this.musicForm.controls['duration'].value;
      this.music.country = this.musicForm.controls['country'].value;
      this.music.artists = this.fields['artists'].value 
          this._authService.getUserFromLocalStorage().subscribe(user => {
      this.music.user = user._id
    })

      this.subscription.add(this._musicService.updateMusic(this.music, this.music._id).subscribe(response => {
        this._router.navigate(['music/list']);
        this.alertService.success("Succesfully edited Music ");
      }))


    }
    else {

    }
  }


  getMusics() {

    this._musicService.getMusics().subscribe(
      musics => {
        this.musics = musics

        this.musics.forEach(c => {
          if (c._id == this.music._id) {
            this.music = c
          }
        })
      }
    )


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
