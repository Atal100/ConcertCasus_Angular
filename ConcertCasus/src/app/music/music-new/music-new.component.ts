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
  selector: 'app-music-new',
  templateUrl: './music-new.component.html',
  styleUrls: ['./music-new.component.css']
})
export class MusicNewComponent implements OnInit {

  music = new Music();
  artists: Artist[];
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
    private _authService: AuthService,
    private alertService: AlertService

  ) {
    this.musicForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      artists: this._formBuilder.array([]),
      duration: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      country: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.submitWaiting = false;
   }

  ngOnInit(){
    this.getArtists();
    this.addArtist();
  
  }

  public get fields() {
    return this.musicForm.controls;
  }

  public get newartist() {
    return this.musicForm.controls["artists"] as FormArray
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

  onMusicSubmit(){
    this.submitWaiting = true;
    const music = new Music();
    music.artists = [];
    music.name = this.fields['name'].value;
    music.duration = this.fields['duration'].value;
    music.country = this.fields['country'].value;
    music.artists = this.fields['artists'].value 
    music.user = this._authService.currentUser$

    console.log(music)

    this._musicService.createMusic(music).subscribe(response => {
     
        this._router.navigate(['music/list'])
        this.alertService.success("You have succesfully created a Music")
    
      
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
