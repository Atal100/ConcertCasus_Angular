import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { Observable, of, Subject } from 'rxjs';
import { AlertService } from '../alerts/alert.service';
import { AlertsComponent } from '../alerts/alerts.component';
import { User } from '../user/user.model';
import { Artist } from './artist.model';

import { ApiResponse, ArtistService } from './artist.service';
export class TestAlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: "success", text: message });
  }
  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: "success", text: message });
  }
}
fdescribe('ArtistService', () => {

  let service: ArtistService;

  let httpSpy: jasmine.SpyObj<HttpClient>;

  //mock data

  const user: User = {
    id: "testZId",
   firstname: "ataas",
   lastname: "dfwersa",

   email: "adttw@sdfasdf.nl",
   password: "qaz",
   

    
  }
   const artists: Artist[] = [{
     _id: "Test",
     name: "Dj Azura",
     genre: "Techno",
     country: "Nederland" 

   },{
   _id: "Test2",
   name: "Dj Azuras2",
   genre: "DupStep",
   country: "Japan"
   

 },{
 _id: "Test3",
 name: "Dj Azuras1",
 genre: "Classic",
 country: "Belgie"
}]

 const artist: Artist = {
   _id: "Test1",
 name: "Dj Azuras1",
 genre: "Classic",
 country: "Amerika"
 

 }
 const updateartist: Artist ={
   _id: "Test1",
 name: "Dj Azuras1 Edit",
 genre: "Classic",
 country: "Nederland"

 }


  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put','delete']);

    TestBed.configureTestingModule({
      
      providers: 
      [{ provide: HttpClient, useValue: httpSpy},
        {provide: AlertService, useClass: TestAlertService}]
    });
    service = TestBed.inject(ArtistService);
    //alertservice = TestBed.inject(AlertService)
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should get list of artists', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(artists));

    service.getArtists().subscribe((getartists: Artist[]) => {
      expect(getartists.length).toBe(3);
      expect(getartists[0]._id).toEqual(artists[0]._id);
      done();
    });
  });

  

  fit('should create artist', (done: DoneFn) => {
    httpSpy.post.and.returnValue(of(artist));

    service.createArtist(artist).subscribe(artistcreated => {
      console.log(artistcreated)
      expect(artistcreated).toBe(artist);
      expect(artistcreated._id).toBe(artist._id)
      expect(artistcreated.name).toEqual("Dj Azuras1")
      done();

    })
  });

  fit('should edit artist',(done: DoneFn) =>{
    httpSpy.put.and.returnValue(of(updateartist))

     service.updateArtist(updateartist,artist._id).subscribe(artistupdate => {
       console.log(updateartist)
       expect(artistupdate).toBe(updateartist)
       expect(artistupdate.name).toEqual("Dj Azuras1 Edit")    
       done();
     })
  });

  fit('should delete artist',(done:DoneFn) =>{
    httpSpy.delete.and.returnValue(of(true))


    const artistdeletes: Artist = {
      _id: "Test",
      name: "Dj Azura",
      genre: "Techno",
      country: "Nederland" 
    }
 
  
    service.deleteArtist(artistdeletes._id).subscribe(response => {   
      console.log(response)
      console.log(artistdeletes)
      console.log(artistdeletes._id)
      expect(response).toBe(true)     
      done();
     
      
    })
 
 
  })
});
