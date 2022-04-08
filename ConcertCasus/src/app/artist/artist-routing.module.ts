import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArtistDetailComponent } from "./artist-detail/artist-detail.component";
import { ArtistEditComponent } from "./artist-edit/artist-edit.component";
import { ArtistComponent } from "./artist.component";

const routes: Routes =[
    {path: "artist",
    component: ArtistComponent,
    children: [
        {path: ":id", component: ArtistDetailComponent},
        {path: ":id/edit", component: ArtistEditComponent,
        data: {
            title: "Edit Artist"
        }}
    ]}
];


@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class ArtistRoutingModule {}