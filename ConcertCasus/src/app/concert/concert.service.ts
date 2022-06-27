import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Concert } from './concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

concerts: Concert[];
concert: Concert

private ConcertUrl = "http://localhost:3000/api/concert/"

  constructor(private http: HttpClient) {
    console.log("ConcertService constructed");
    console.log("Connected to" + this.ConcertUrl);
   }



  getConcerts(): Observable<Concert[]>{
    console.log("getConcerts")
    return this.http.get<Concert[]>(this.ConcertUrl)
    .pipe(map(concerts => concerts.map((concert) => new Concert(concert))))
  }

  createConcert(concert: Concert){
    console.log('createConcert')

    return this.http
    .post<Concert>(this.ConcertUrl, concert)
    //.pipe(catchError(this.handleError), tap(console.log)); 
   }

  updateConcert(concert: Concert, id: string){
    console.log('updateConcert')
    console.log(id);
    return this.http.put(this.ConcertUrl + concert._id, concert);
  }
  
  deleteConcert(id: string){
    console.log('deleteConcert ' + id)
    console.log(this.http.delete(this.ConcertUrl + id))
    return this.http.delete(this.ConcertUrl + id);
  }

}


