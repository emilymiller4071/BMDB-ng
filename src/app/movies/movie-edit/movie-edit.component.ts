import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit{
  pageTitle: string = "Movie Edit";
  movie: Movie = new Movie();
  id: number = 0;

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => this.id = params['id']);
      this.movieService.getById(this.id).subscribe(jsonResponse =>
        this.movie = jsonResponse as Movie);
    }
}
