import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ArtistDetailComponent } from "./artist-detail/artist-detail.component";
import { ArtistEditComponent } from "./artist-edit/artist-edit.component";
import { ArtistListComponent } from "./artist-list/artist-list.component";
import { ArtistNewComponent } from "./artist-new/artist-new.component";
import { ArtistComponent } from "./artist.component";

const routes: Routes =[

    {path: "artist/list",
    component: ArtistListComponent,
   
    children: [
        
        {path: ":id", component: ArtistDetailComponent}
        
       
        
    ]},


    
    
    {path: "artist",
    component: ArtistComponent,

    children: [
        {path: "new", component: ArtistNewComponent
   
    },
        {path: ":id", component: ArtistDetailComponent},
        
        {path: "edit/:id", component: ArtistEditComponent,
        data: {
            title: "Edit Artist"
        },

    }
    ]},
];


@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class ArtistRoutingModule {}