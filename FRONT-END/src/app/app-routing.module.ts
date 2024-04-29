import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProjectsComponent} from "./projects/projects.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {ToDoApplicationComponent} from "./to-do-application/to-do-application.component";
import {SniperListComponent} from "./sniper-list/sniper-list.component"
import {SoccermatchesComponent} from "./soccermatches/soccermatches.component";
// import {CanActivateFn, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./authentication/auth.guard";
import {LoginComponent} from "./login/login.component";

const isAuthenticated: CanActivateFn = (route, state) => {
    return inject(AuthGuard).isAccessAllowed(route, state);
}

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'home', component: HomeComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    canActivate: [isAuthenticated],
    component: HomeComponent
  },
  { path: 'projects', component: ProjectsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'ToDoApplication', component: ToDoApplicationComponent },
  { path: 'sniperlist', component: SniperListComponent },
  { path: 'soccermatches', component: SoccermatchesComponent },

  // { path: '', redirectTo: '/page1', pathMatch: 'full' }, // Redirect to page1 as the default route


  {
    path: '**', redirectTo: 'home'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
