import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditService } from 'src/app/service/credit.service';
import { Credit } from 'src/model/credit.class';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit{
  pageTitle: string = "Credit List";
  movie: Movie = new Movie();
  actor: Actor = new Actor();
  actors: Actor[] = [];
  credits: Credit[] = [];
  id: number = 0;
  movieImageLoaded: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private creditService: CreditService,
    private movieService: MovieService,
    private actorService: ActorService) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => this.id = params['id']);
      this.creditService.getByMovieId(this.id).subscribe(
        jsonResponse => {
          this.credits = jsonResponse as Credit[];
        }
      );
      this.actorService.getAll().subscribe(
        jsonResponse => {
          this.actors = jsonResponse as Actor[];
        }
      );
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
  }
