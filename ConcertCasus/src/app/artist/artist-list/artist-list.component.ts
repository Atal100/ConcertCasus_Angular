import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import {    MatTableDataSource } from '@angular/material/table'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertsComponent } from 'src/app/alerts/alerts.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  
  displayedColumns: string[] = ['name','genre','country', 'delete']
  dataSource: MatTableDataSource<Artist>;
  confirmDialogRef: MatDialogRef<AlertsComponent>;

  private selectArtist: Artist;
  private _loading: boolean;

  artist: Artist;
  artists: Artist[]


  constructor(
    private router: Router,
    private artistService: ArtistService,
    public authService: AuthService
  ) { 
  }
  
  
  ngOnInit() {
    this.loadArtist()   
  }
  string ="../../assets/img/placeholder.png "

  loadArtist() {
    this.artistService.getArtists().subscribe(
      artists => {
    
        this.artists = artists;
        this._loading = false;
        this.dataSource = new MatTableDataSource(this.artists)
      }
    );
  }

  public get loading(): boolean {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  onSelectArtist(artist: Artist){
    this.selectArtist = artist;
    this.router.navigate(["/artist/list/" + this.selectArtist._id])
  }

  deleteartist(artistId: string): void{
    this.artistService.deleteArtist(artistId).subscribe(response => {
      this.loadArtist();
    })
  }

}


