import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorCreateComponent } from './actors/actor-create/actor-create.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorEditComponent } from './actors/actor-edit/actor-edit.component';
import { ActorListComponent } from './actors/actor-list/actor-list.component';
import { CreditCreateComponent } from './credits/credit-create/credit-create.component';
import { CreditDetailComponent } from './credits/credit-detail/credit-detail.component';
import { CreditEditComponent } from './credits/credit-edit/credit-edit.component';
import { CreditListComponent } from './credits/credit-list/credit-list.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies/list', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/edit/:id', component: MovieEditComponent },
  { path: 'actors/create', component: ActorCreateComponent},
  { path: 'actors/list', component: ActorListComponent },
  { path: 'actors/:id', component: ActorDetailComponent},
  { path: 'actors/edit/:id', component: ActorEditComponent},
  { path: 'credits/list/:id', component: CreditListComponent},
  { path: 'credits/movies/:id', component: CreditCreateComponent},
  { path: 'credits/edit/:id', component: CreditEditComponent},
  { path: 'credits/detail/:id', component: CreditDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
