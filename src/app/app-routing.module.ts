import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: 'movies/edit/:id', component: MovieEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
