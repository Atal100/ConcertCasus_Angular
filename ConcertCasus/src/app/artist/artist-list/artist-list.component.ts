import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import {    MatTableDataSource } from '@angular/material/table'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertsComponent } from 'src/app/alerts/alerts.component';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [
    {
      _id: "fadfaffsffddsaf",
      name: "Dj Azura",
      genre: "Techno",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      _id: "fadfaffsffddsaf",
      name: "Dj Azura",
      genre: "Techno",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      _id: "fadfaffsffddsaf",
      name: "Dj Azura",
      genre: "Techno",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      _id: "fadfaffsffddsaf",
      name: "Dj Azura",
      genre: "Techno",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      _id: "fadfaffsffddsaf",
      name: "Dj Azura",
      genre: "Techno",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
  ]

  displayedColumns: string[] = ['name','genre','delete']
  dataSource: MatTableDataSource<Artist>;
  confirmDialogRef: MatDialogRef<AlertsComponent>;

  private selectArtist: Artist;
  private _loading: boolean;

  artist: Artist = {
    _id: "fadfaffsffddsaf",
    name: "Dj Azura",
    genre: "Techno",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private _matDialog: MatDialog
  ) { 
  }
  
  
  ngOnInit() {
    console.log(this.artists)
    this.loadArtist()   
  }

  loadArtist() {
    this.artistService.getArtists().subscribe(
      artists => {
    
        this.artists = artists;
        console.log(this.artists)
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
      console.log(response)
    })
  }

}


