import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../user/user.model';
import { Artist } from './artist.model';

import { ApiResponse, ArtistService } from './artist.service';

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
//   const artists: Artist[] = [{
//     _id: "Test",
//     name: "Dj Azura",
//     genre: "Techno",
//     image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
//     ,
// user: new User()
//   },{
//   _id: "Test2",
//   name: "Dj Azuras2",
//   genre: "DupStep",
//   image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
//   ,
// user: new User()
// },{
// _id: "Test3",
// name: "Dj Azuras1",
// genre: "Classic",
// image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
// ,
// user: new User()
// }]

// const artist: Artist = {
//   _id: "Test1",
// name: "Dj Azuras1",
// genre: "Classic",
// image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
// ,
// user: new User()
// }
// const updateartist: Artist ={
//   _id: "Update1",
// name: "Dj Azuras1 Edit",
// genre: "Classic",
// image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
// user: new User()
// }


  

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put','delete']);

    TestBed.configureTestingModule({
      
      providers: [{ provide: HttpClient, useValue: httpSpy}]
    });
    service = TestBed.inject(ArtistService);
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
      done();

    })
  });

  fit('should edit artist',(done: DoneFn) =>{
    httpSpy.put.and.returnValue(of(artist))

     service.updateArtist(updateartist,artist._id).subscribe(artistupdate => {
       console.log(artistupdate)
       expect(artistupdate).toBe(artist)
      
       done();
     })
  });

  fit('should delete artist',(done:DoneFn) =>{
    httpSpy.delete.and.returnValue(of(artist))

    service.deleteArtist(artist._id).subscribe(response => {
      expect(response).toBe(artist)
       
      done();
    })
  })
});
