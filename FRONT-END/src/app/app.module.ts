import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SniperListComponent } from './sniper-list/sniper-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ToDoApplicationComponent } from './to-do-application/to-do-application.component';
import { SoccermatchesComponent } from './soccermatches/soccermatches.component';
import { AppRoutingModule } from './app-routing.module';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { LoginComponent } from './login/login.component';

function initializeKeycloak(keycloak: KeycloakService) {
  console.log("Mannnn Stevoooooo")
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080',
                realm: 'PrimesniperRealm',
                clientId: 'PrimesniperFrontend'
            },
            initOptions: {
                onLoad: 'check-sso'
            }
        });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SniperListComponent,
    ProjectsComponent,
    GalleryComponent,
    ToDoApplicationComponent,
    SoccermatchesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage,
    AppRoutingModule,
    KeycloakAngularModule

  ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        }
    ],  bootstrap: [AppComponent]
})
export class AppModule { }



