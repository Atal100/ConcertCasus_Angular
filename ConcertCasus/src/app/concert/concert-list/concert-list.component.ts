import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertsComponent } from 'src/app/alerts/alerts.component';
import { Artist } from 'src/app/artist/artist.model';
import { ArtistService } from 'src/app/artist/artist.service';
import { Music } from 'src/app/music/music.model';
import { MusicService } from 'src/app/music/music.service';
import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {

  musics: Music[];
  artists: Artist[];
  concerts: Concert[];

  displayedColumns: string[] = ['name','music','date','adres','delete']
  dataSource: MatTableDataSource<Concert>;
  confirmDialogRef: MatDialogRef<AlertsComponent>;


  private selectConcert: Concert;
  private _loading: boolean;

  constructor(
    private router: Router,
    private musicService: MusicService,
    private _matDialog: MatDialog,
    private _artistService: ArtistService,
    private _concertService: ConcertService
  ) { }

  ngOnInit(){
    this.loadConcert();
    this.loadMusic();
    this.getArtists();
    
  }

  loadConcert(){
    this._concertService.getConcerts().subscribe(
      
      concerts => {
        console.log("Concert " + concerts)
        this.concerts = concerts;
        this._loading = false
        this.dataSource = new MatTableDataSource(this.concerts)
      }
    )
  }

  loadMusic() {
    this.musicService.getMusics().subscribe(
      musics => {
    
        this.musics = musics;
        console.log(this.musics)
        this._loading = false;
       
      }
    );
  }

  getArtists() {
    this._artistService.getArtists().subscribe(
      
      artists => {
        console.log("artisten" + artists)
        this.artists = artists;
        this._loading = false
      }
      
    )
  }

  onSelectConcert(concert: Concert){
    this.selectConcert = concert;
    this.router.navigate(["/concert/list/" + this.selectConcert._id])
  }

  deleteConcert(concertId: string): void{
    this._concertService.deleteConcert(concertId).subscribe(response => {
      this.loadConcert();
      console.log(response)
    })
  }

}
