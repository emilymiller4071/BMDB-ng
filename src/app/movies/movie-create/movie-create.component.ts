import { Component } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/model/movie.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  pageTitle: string = "Movie Create"
  movie: Movie = new Movie();
  yearPlaceholder: string = 'yyyy';
  errorMessage: string = '';

  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute, private location: Location) {}


    create() {
      // Convert rating to uppercase
      this.movie.rating = this.movie.rating.toUpperCase();

      if (this.movie.imageUrl === null) {
        this.movie.imageUrl = this.movie.imageUrl || '../../assets/default.jpg';
      }
  
      // Call the movieService to create the movie
      this.movieService.create(this.movie).subscribe(jsonResponse => {
        this.movie = jsonResponse as Movie;
  
        
        this.router.navigate(['/movies/list']); 
      },
      error => {
        if (error.status === 500) {
          this.errorMessage = 'ERROR. MOVIE MAY ALREADY EXIST';
        }
      });
  
     
  }
}