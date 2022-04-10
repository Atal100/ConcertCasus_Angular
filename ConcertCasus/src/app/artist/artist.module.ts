import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistRoutingModule } from './artist-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [
    ArtistComponent,
    ArtistDetailComponent,
    ArtistEditComponent,
    ArtistListComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistRoutingModule,
    RouterModule,
    
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,




  ],

  providers: [],
  exports: [ArtistComponent]
})
export class ArtistModule { }
