import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, of, pipe, tap, throwError } from 'rxjs';
import { AlertService } from '../alerts/alert.service';
import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artists: Artist[];
  artist: Artist;
  private ArtistUrl = "http://localhost:3000/api/artist/"

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient, private alertService: AlertService) { 
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
    console.log('getArtist ' + this.ArtistUrl + id)
    console.log('https' + this.http
      .get<Artist>(this.ArtistUrl + id))

    return this.http.get<Artist>(`${this.ArtistUrl}${id}`)
     
    

    
  }

  createArtist(artist: Artist){
    console.log('createArtist')

    return this.http
    .post<Artist>(this.ArtistUrl, artist).pipe(
      map((artist) => {
        this.alertService.success("You have succesfully created a Artist")
        return artist
      }),
      catchError((error: any) => {
        console.log('error:', error);
        console.log('error.message:', error.message);
        console.log('error.error.message:', error.error.message);
        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
    //.pipe(catchError(this.handleError), tap(console.log)); 
   }

  updateArtist(artist: Artist, id: string){
    console.log('updateArtist')
    console.log(id);
    return this.http.put(this.ArtistUrl + artist._id, artist).pipe(
      map((artist) => {
        this.alertService.success("You have succesfully updated a Artist")
        return artist
      }),
      catchError((error: any) => {
        console.log('error:', error);
        console.log('error.message:', error.message);
        console.log('error.error.message:', error.error.message);
        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }
  
  deleteArtist(id: string){
    console.log('deleteArtist ' + id)
    console.log(this.http.delete(this.ArtistUrl + id))
    return this.http.delete(this.ArtistUrl + id).pipe(
      map((artist) => {
        this.alertService.success("You have succesfully deleted a Artist")
        return artist
      }),
      catchError((error: any) => {
        console.log('error:', error);
        console.log('error.message:', error.message);
        console.log('error.error.message:', error.error.message);
        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }

  private handleError(error: HttpErrorResponse) {
    return error.message || error;
  }

}
export interface ApiResponse{
  results: any[];
}



