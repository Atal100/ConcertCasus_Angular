import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ConcertDetailComponent } from "./concert-detail/concert-detail.component";
import { ConcertEditComponent } from "./concert-edit/concert-edit.component";
import { ConcertListComponent } from "./concert-list/concert-list.component";
import { ConcertNewComponent } from "./concert-new/concert-new.component";
import { ConcertComponent } from "./concert.component";
import { Concert } from "./concert.model";

const routes: Routes = [
    {path: "concert/list",
    component: ConcertListComponent,
    canActivate: [AuthGuard],
    children: [
   
        {path: ":id", component: ConcertDetailComponent, canActivate: [AuthGuard]},
        
    ]},


    
    
    {path: "concert",
    component: ConcertComponent,
    canActivate: [AuthGuard],
    children: [
        {path: "new", component: ConcertNewComponent,
    canActivate: [AuthGuard]
    },
        {path: ":id", component: ConcertDetailComponent, canActivate: [AuthGuard]},
        
        {path: "edit/:id", component: ConcertEditComponent,
        data: {
            title: "Edit Concert"
        },
    canActivate: [AuthGuard]
    }
    ]},
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class ConcertRoutingModule {}