import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/model/movie.class';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{


  pageTitle: string = "Movie List";
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  id: any;

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router, private location: Location) {
  }
  ngOnInit() {
    // subscribe to the list of movies we get from the get request
    this.movieService.getAll().subscribe(jsonResponse => {
      // add the data inside the returned jsonResponse to the array of movies
      this.movies = jsonResponse.sort((a, b) => a.title.localeCompare(b.title));
    })
  }
  
  }

