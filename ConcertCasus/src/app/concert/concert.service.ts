import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from '../alerts/alert.service';
import { Concert } from './concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

concerts: Concert[];
concert: Concert

private ConcertUrl = "https://concertcasus.onrender.com/api/concert/"

  constructor(private http: HttpClient, private alertService: AlertService) {
    console.log("ConcertService constructed");
    console.log("Connected to" + this.ConcertUrl);
   }

    getConcert(id: string): Observable<Concert> {
    console.log('https' + this.http
      .get<Concert>(this.ConcertUrl + id))

    return this.http.get<Concert>(this.ConcertUrl + id)
     
    

    
  }


  getConcerts(): Observable<Concert[]>{
    console.log("getConcerts")
    return this.http.get<Concert[]>(this.ConcertUrl)
    .pipe(map(concerts => concerts.map((concert) => new Concert(concert))))
  }

  createConcert(concert: Concert){
    console.log('createConcert')

    return this.http
    .post<Concert>(this.ConcertUrl, concert).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully created a Concert")
        return concert
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

  updateConcert(concert: Concert, id: string){
    console.log('updateConcert')
    console.log(id);
    return this.http.put(this.ConcertUrl + concert._id, concert).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully updated a Concert")
        return concert
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
  
  deleteConcert(id: string){
    console.log('deleteConcert ' + id)
    console.log(this.http.delete(this.ConcertUrl + id))
    return this.http.delete(this.ConcertUrl + id).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully deleted a Concert")
        return concert
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

}


