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

  getMovieImageSource(): string {
    // Define the image URL based on the movie title
    let imageUrl = `../../assets/${this.movie.title}.jpg`;
  
    // Check if the image exists; if not, use the default image
    const image = new Image();
    image.src = imageUrl;
  
    if (!image.complete || typeof image.naturalWidth === 'undefined' || image.naturalWidth === 0) {
      imageUrl = '../../assets/default.png';
    }
  
    return imageUrl;
  }

  isDefaultImage(): boolean {
    return !this.movie.imageUrl || this.movie.imageUrl === '../../assets/default.png';

  }

  delete() {
    this.movieService.delete(this.id).subscribe( jsonResponse =>
      this.router.navigateByUrl('movies/list'));
  }

}
