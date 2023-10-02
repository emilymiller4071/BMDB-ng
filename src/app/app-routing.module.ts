import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {path: 'movies', component: MovieListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
