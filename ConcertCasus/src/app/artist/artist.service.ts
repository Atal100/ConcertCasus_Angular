import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artists: Artist[];
  
  artist: Artist;
  private ArtistUrl = "http://localhost:3000/api/artist/"
  constructor(private http: HttpClient) { 
    console.log("ArtistService constructed");
    console.log("Connected to" + this.ArtistUrl);
  }

  getArtists(): Observable<Artist[]>{
    console.log('getArtists')
    return this.http
    .get<Artist[]>(this.ArtistUrl)
    .pipe(map(artists => artists.map((artist) => new Artist(artist))))


  }
  getArtist(id: string): Observable<Artist> {
    console.log('getArtist ' + id)
    return this.http
    .get<Artist>(this.ArtistUrl + id)
    //.pipe(catchError(this.handleError));
  }

  createArtist(artist: Artist){
    console.log('createArtist')

    return this.http
    .post<Artist>(this.ArtistUrl, artist)
    //.pipe(catchError(this.handleError), tap(console.log)); 
   }

  updateArtist(artist: Artist){
    console.log('updateArtist')
    console.log(artist);
    return this.http.put(this.ArtistUrl + artist._id, artist);
  }
  
  deleteArtist(id: string){
    console.log('deleteArtist ' + id)
    this.http.delete(this.ArtistUrl + id);
  }

  private handleError(error: HttpErrorResponse) {
    return error.message || error;
  }

}
export interface ApiResponse{
  results: any[];
}



