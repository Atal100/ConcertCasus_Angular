import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      artist: ['',[Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      country: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.submitWaiting = false;
   }

  ngOnInit(){
    this.getArtists();
  
  }

  public get fields() {
    return this.musicForm.controls;
  }

  onMusicSubmit(){
    this.submitWaiting = true;

    const music = new Music();

    music.name = this.musicForm.controls['name'].value;
    music.duration = this.musicForm.controls['duration'].value;
    music.country = this.musicForm.controls['country'].value;
    music.artist = this.musicForm.controls['artist'].value;
    //music.user = this._authService.currentUser$.value

    this._musicService.createMusic(music).subscribe(response => {
  
      this._router.navigate(['music/list'])
      this.alertService.success("Succesfully added Music ");
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
