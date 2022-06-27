import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Artist } from './artist.model';

import { ApiResponse, ArtistService } from './artist.service';

fdescribe('ArtistService', () => {
  let service: ArtistService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  //mock data
  const artists: Artist[] = [{
    _id: "Test",
    name: "Dj Azura",
    genre: "Techno",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  },{
  _id: "Test2",
  name: "Dj Azuras2",
  genre: "DupStep",
  image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
},{
_id: "Test1",
name: "Dj Azuras1",
genre: "Classic",
image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
}]

const artist: Artist = {
  _id: "Test1",
name: "Dj Azuras1",
genre: "Classic",
image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
}


  

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

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

  it('should get artist', () => {})

  fit('should create artist', (done: DoneFn) => {
    httpSpy.post.and.returnValue(of(artist));

    service.createArtist(artist).subscribe(artistcreated => {
      console.log(artistcreated)
      expect(artistcreated).toBe(artist);
      expect(artistcreated._id).toBe(artist._id)
      done();

    })
  });

  it('should edit artist',(done: DoneFn) =>{
    httpSpy.put.and.returnValue(of(artist))
  });

  it('should delete artist',() =>{})
});
