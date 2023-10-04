import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  pageTitle: string = "Movie Detail";
  movie: Movie = new Movie();
  id: number = 0;
  movieImageLoaded: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.movieService.getById(this.id).subscribe(jsonResponse => {
      this.movie = jsonResponse as Movie;
      this.loadMovieImage();
    });
    
  }

  loadMovieImage(): void {
    const imageUrl = `../../assets/${this.movie.title}.jpg`;
    console.log('Image URL:', imageUrl);

    const imageLoadPromise = new Promise<boolean>((resolve) => {
      const image = new Image();
      image.src = imageUrl;  

      // Use the onload event to check when the image is loaded
      image.onload = () => {
        if (image.naturalWidth > 0) {
          this.movie.imageUrl = imageUrl;
        } else {
          this.movie.imageUrl = '../../assets/default.png';
        }
        this.movieImageLoaded = true;
        resolve(true);
      };

      image.onerror = () => {
        this.movie.imageUrl = '../../assets/default.png';
        this.movieImageLoaded = true;
        resolve(true);
      };
    });

    imageLoadPromise.then(() => {
      this.movieImageLoaded = true;
    });
  }

  isDefaultImage(): boolean {
    return !this.movieImageLoaded || this.movie.imageUrl === '../../assets/default.png';
  }

  delete() {
    this.movieService.delete(this.id).subscribe(jsonResponse =>
      this.router.navigateByUrl('movies/list'));
  }
}

