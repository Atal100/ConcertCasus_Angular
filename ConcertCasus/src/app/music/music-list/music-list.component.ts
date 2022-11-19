import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertsComponent } from 'src/app/alerts/alerts.component';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { Music } from '../music.model';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  musics: Music[];
  artists: Artist[];

  displayedColumns: string[] = ['name','artist','duration','genre','country', 'delete']
  dataSource: MatTableDataSource<Music>;
  confirmDialogRef: MatDialogRef<AlertsComponent>;


  private selectMusic: Music;
  private _loading: boolean;

  constructor(
    private router: Router,
    private musicService: MusicService,
    private _matDialog: MatDialog,
    private _artistService: ArtistService
  ) { }

  ngOnInit(){
    this.loadMusic();
    this.getArtists();
  }

  loadMusic() {
   

    this.musics = this.musicService.getMusics()
    console.log(this.musics);
   this.loading = false;
   this.dataSource = new MatTableDataSource(this.musics);
   
    // this.musicService.getMusics().subscribe(
    //   musics => {
    
    //     this.musics = musics;
    //     console.log(this.musics)
    //     this._loading = false;
    //     this.dataSource = new MatTableDataSource(this.musics)
    //   }
    // );
  }

  public get loading(): boolean {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  onSelectMusic(music: Music){
    this.selectMusic = music;
    this.router.navigate(["../"+ this.selectMusic._id])
  }

  getArtists(): any{

    this.artists = this._artistService.getArtists()

   
    this.loading = false;
   
    // this._artistService.getArtists().subscribe(
      
    //   artists => {
    //     console.log("artisten" + artists)
    //     this.artists = artists;
    //     this._loading = false
    //   }
      
    // )
  }

  deletemusic(musicId: string): void{
    this.musicService.deleteMusic(musicId)
    this.loadMusic();
    // this.musicService.deleteMusic(musicId).subscribe(response => {
    //   this.loadMusic();
    //   console.log(response)
    // })
  }

}
