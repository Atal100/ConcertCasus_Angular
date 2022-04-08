import { Component, OnInit } from '@angular/core';
import { Artist } from './artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: Artist = {
    _id: "fadfaffsffddsaf",
    name: "Dj Azura",
    genre: "Techno",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
