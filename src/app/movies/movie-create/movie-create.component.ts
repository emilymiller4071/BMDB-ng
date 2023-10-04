import { Component } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/model/movie.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  pageTitle: string = "Movie Create"
  movie: Movie = new Movie();
  yearPlaceholder: string = 'yyyy';


  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) {}


    create() {
      // Convert rating to uppercase
      this.movie.rating = this.movie.rating.toUpperCase();

      if (this.movie.imageUrl === null) {
        this.movie.imageUrl = this.movie.imageUrl || '../../assets/default.jpg';
      }
  
      // Call the movieService to create the movie
      this.movieService.create(this.movie).subscribe(jsonResponse => {
        this.movie = jsonResponse as Movie;
  
        // Trigger route refresh to reload the movies/list page
        this.router.navigate(['/movies/list']); 
      });
  
     
  }
}