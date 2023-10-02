import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/model/movie.class';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  pageTitle: string = "Movie List"
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
  }
  ngOnInit() {
    // subscribe to the list of movies we get from the get request
    this.movieService.getAll().subscribe(jsonResponse => {
      // add the data inside the returned jsonResponse to the array of movies
      this.movies = jsonResponse as Movie[];
    })
  }



}
