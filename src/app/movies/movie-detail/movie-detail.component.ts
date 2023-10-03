import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit{
  pageTitle: string = "Movie Detail"
  movie: Movie = new Movie();
  id: number = 0;

constructor(private movieService: MovieService,
  private route: ActivatedRoute,
  private router: Router){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.movieService.getById(this.id).subscribe(jsonResponse =>
      this.movie = jsonResponse as Movie);
  }


}
