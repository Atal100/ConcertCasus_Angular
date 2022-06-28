import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Artist } from '../artist.model';

import { ArtistListComponent } from './artist-list.component';

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let fixture: ComponentFixture<ArtistListComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  
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
_id: "Test3",
name: "Dj Azuras1",
genre: "Classic",
image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
}]

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ArtistListComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MatDialog, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put','delete']);
    fixture = TestBed.createComponent(ArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
