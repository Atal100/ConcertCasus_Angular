import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
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
    private _artistService: ArtistService

  ) {
    this.musicForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      artist: ['',[Validators.required]],
      duration: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })

    this.submitWaiting = false;
   }

  ngOnInit(){
    this.getArtists();
  
  }

  onMusicSubmit(){
    this.submitWaiting = true;

    const music = new Music();

    music.name = this.musicForm.controls['name'].value;
    music.duration = this.musicForm.controls['duration'].value;
    music.image = this.musicForm.controls['image'].value;
    music.artist = this.musicForm.controls['artist'].value;

    this._musicService.createMusic(music).subscribe(response => {
      this._router.navigate(['music/list'])
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
