import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { ArtistService } from '../artist.service';

import { ArtistEditComponent } from './artist-edit.component';

describe('ArtistEditComponent', () => {
  let component: ArtistEditComponent;
  let fixture: ComponentFixture<ArtistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistEditComponent ],
      imports: [RouterTestingModule,HttpClientModule ],
      providers: [RouterTestingModule, HttpClientModule,AlertService, FormBuilder,ArtistService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update artist', () => {
    const activatedRouteStub = {
      params: of({ id: '123' }) // Use of() to create an Observable
    };
  
    const artistServiceSpy = jasmine.createSpyObj('ArtistService', ['updateArtist']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const formSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['success']);
  
    const component = new ArtistEditComponent(
      activatedRouteStub as any,
      formSpy as any,
      artistServiceSpy,
      routerSpy,
      alertServiceSpy
    );
  
    // Set artist and form data here
  
    artistServiceSpy.updateArtist.and.returnValue(of('Success')); // Set the return value of updateArtist()
  
    component.onArtistSubmit();
  
    expect(artistServiceSpy.updateArtist).toHaveBeenCalledWith(
      component.artist,
      component.artist._id
    );
  
    expect(routerSpy.navigate).toHaveBeenCalledWith(['artist/list']);
    expect(alertServiceSpy.success).toHaveBeenCalledWith(
      'Successfully edited Artist'
    );
  })
});
