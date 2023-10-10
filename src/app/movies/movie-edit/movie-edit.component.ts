import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit{
  pageTitle: string = "Movie Edit";
  movie: Movie = new Movie();
  id: number = 0;
  errorMessage: string = '';

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router, private location: Location) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => this.id = params['id']);
      this.movieService.getById(this.id).subscribe(jsonResponse =>
        this.movie = jsonResponse as Movie);
    }

    update() {
      this.movie.rating = this.movie.rating.toUpperCase();

      this.movieService.update(this.movie).subscribe(
        (updatedMovie: Movie) => {
          // Update the local movie object with the new values returned from the server
          this.movie = updatedMovie;
          // Redirect to movie detail page with updated movie object
          this.router.navigate([`/movies/${this.movie.id}`]);
        },
        error => {
          if (error) {
            this.errorMessage = 'THERE WAS AN ERROR UPDATING THIS MOVIE'
          }
        }
      );
    }

    delete() {
      this.movieService.delete(this.id).subscribe( jsonResponse =>
        this.router.navigateByUrl('movies/list'));
    }

    onCancelClick() {
      this.location.back();
    }
}
