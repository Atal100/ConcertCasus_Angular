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

   }

    getConcert(id: string): Observable<Concert> {


    return this.http.get<Concert>(this.ConcertUrl + id)
     
    

    
  }


  getConcerts(): Observable<Concert[]>{
    return this.http.get<Concert[]>(this.ConcertUrl)
    .pipe(map(concerts => concerts.map((concert) => new Concert(concert))))
  }

  createConcert(concert: Concert){

    return this.http
    .post<Concert>(this.ConcertUrl, concert).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully created a Concert")
        return concert
      }),
      catchError((error: any) => {

        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )

   }

  updateConcert(concert: Concert, id: string){

    return this.http.put(this.ConcertUrl + concert._id, concert).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully updated a Concert")
        return concert
      }),
      catchError((error: any) => {

        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }
  
  deleteConcert(id: string){

    return this.http.delete(this.ConcertUrl + id).pipe(
      map((concert) => {
        this.alertService.success("You have succesfully deleted a Concert")
        return concert
      }),
      catchError((error: any) => {

        this.alertService.error(error.error.message || error.message);
        return of(undefined);
      })
    )
  }

}


