import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
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

   ngOnInit() {
     this.subscription.add(this._route.params.subscribe((params) => {
       this.params = params

       if(this.params != null) {
         this._musicService.getMusics().subscribe(
           musics => {
             this.musics = musics

             this.musics.forEach(c => {
               if(c._id == this.params['id']){
                 this.music = c
                 this.fillForm(this.music)
               }
             })
           }
         )
       }
     }))
    this.getArtist()
  }

  fillForm(music: Music): void{
this.musicForm = this._formBuilder.group({
  name: [music['name']],
  image: [music['image']],
  duration: [music['duration']],
  artist: [music['artist']]
})
  }

  onMusicSubmit(){
    this.subscription.add(this._route.params.subscribe((params) => {
      this.params = params
    }))
    this.submitWaiting = true;
    console.log("music update", this.music)
    if(this.music != null){
    console.log(this.params.id)
      this.music._id = this.params.id
      this.music.name = this.musicForm.controls['name'].value;
      this.music.duration = this.musicForm.controls['duration'].value;
      this.music.image = this.musicForm.controls['image'].value;
      this.music.artist = this.musicForm.controls['artist'].value
      console.log("After add " + this.music.name)

      this.subscription.add(this._musicService.updateMusic(this.music, this.music._id).subscribe(response =>{
        console.log(response)
        this._router.navigate(['music/list']);
      }))

     
    }
    else {
      
    }
  }


  getMusics(){
 
    this._musicService.getMusics().subscribe(
      musics => {
        this.musics = musics

        this.musics.forEach(c => {
          if(c._id == this.music._id){
            this.music = c
          }
        })
      }
    )

    
  }

  getArtist(){
    
    this._artistService.getArtists().subscribe(
      artists => {
      this.artists = artists
      console.log("Test " + this.artists)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
