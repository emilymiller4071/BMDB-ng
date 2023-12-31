import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { ActorListComponent } from './actors/actor-list/actor-list.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorEditComponent } from './actors/actor-edit/actor-edit.component';
import { ActorCreateComponent } from './actors/actor-create/actor-create.component';
import { CreditListComponent } from './credits/credit-list/credit-list.component';
import { CreditEditComponent } from './credits/credit-edit/credit-edit.component';
import { CreditDetailComponent } from './credits/credit-detail/credit-detail.component';
import { ActorRolesComponent } from './actors/actor-roles/actor-roles.component';
import { CreditCreateActorComponent } from './credits/credit-create-actor/credit-create-actor.component';
import { CreditCreateMovieComponent } from './credits/credit-create-movie/credit-create-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    MenuComponent,
    HomeComponent,
    MovieDetailComponent,
    MovieEditComponent,
    ActorListComponent,
    ActorDetailComponent,
    ActorEditComponent,
    ActorCreateComponent,
    CreditListComponent,
    CreditEditComponent,
    CreditDetailComponent,
    ActorRolesComponent,
    CreditCreateActorComponent,
    CreditCreateMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule, 
    FormsModule
  ],
  providers: [  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
