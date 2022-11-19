import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
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
  artist: Artist;
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
    private alertService: AlertService

  ) {
    this.musicForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      artists: ['',[Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      genre: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.submitWaiting = false;
   }

   ngOnInit() {
     this.subscription.add(this._route.params.subscribe((params) => {
       this.params = params

       if(this.params != null){
         this.music = this._musicService.getMusic(this.params['id'])
         this.fillForm(this.music);
         }
      }));

    //    if(this.params != null) {
    //      this._musicService.getMusics().subscribe(
    //        musics => {
    //          this.musics = musics

    //          this.musics.forEach(c => {
    //            if(c._id == this.params['id']){
    //              this.music = c
    //              this.fillForm(this.music)
    //            }
    //          })
    //        }
    //      )
    //    }
    //  }))
    this.getArtists()
  }
  
  public get fields() {
    return this.musicForm.controls;
  }

  fillForm(music: Music): void{
this.musicForm = this._formBuilder.group({
  name: [music['name']],
  country: [music['country']],
  duration: [music['duration']],
  artists: [music['artists']],
  genre: [music['genre']]
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
      this.music.country = this.musicForm.controls['country'].value;
      this.music.genre = this.musicForm.controls['genre'].value;
      this.music.artists = [{"_id": this.musicForm.controls['artists'].value , "name": this.getArtist(this.musicForm.controls['artists'].value)  }]
      console.log("After add " + this.music.name)

      this._musicService.updateMusic(this.music, this.music._id)
      this._router.navigate(['music/list']);
      this.alertService.success("Succesfully edited Music ");

      // this.subscription.add(this._musicService.updateMusic(this.music, this.music._id).subscribe(response =>{
      //   console.log(response)
      //   this._router.navigate(['music/list']);
      //   this.alertService.success("Succesfully edited Music ");
      // }))

     
    }
    else {
      
    }
  }


  getMusics(){
 

    this.music = this._musicService.getMusic(this.music._id)

   
    
    // this._musicService.getMusics().subscribe(
    //   musics => {
    //     this.musics = musics

    //     this.musics.forEach(c => {
    //       if(c._id == this.music._id){
    //         this.music = c
    //       }
    //     })
    //   }
    // )

    
  }

  getArtists(): any{

    this.artists= this._artistService.getArtists()

    
    
    // this._artistService.getArtists().subscribe(
    //   artists => {
    //   this.artists = artists
    //   console.log("Test " + this.artists)
    // })
  }

  getArtist(id: string): any{

    this.artist= this._artistService.getArtist(id)

    
    
    // this._artistService.getArtists().subscribe(
    //   artists => {
    //   this.artists = artists
    //   console.log("Test " + this.artists)
    // })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
