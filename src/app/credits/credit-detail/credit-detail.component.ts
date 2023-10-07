import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrls: ['./credit-detail.component.css']
})
export class CreditDetailComponent implements OnInit{
  pageTitle: string = "Credit Detail";
  credit: Credit = new Credit;
  id: number = 0;
  actor: Actor = new Actor;
  movie: Movie = new Movie;
  movieImageLoaded: boolean = false;
  actorImageLoaded: boolean = false;

  constructor(private actorService: ActorService,
    private movieService: MovieService, private creditService: CreditService,
    private route: ActivatedRoute, private router: Router,
    private location: Location) {}


    ngOnInit(): void {
      this.route.params.subscribe(params => this.id = params['id']);
      this.creditService.getById(this.id).subscribe(jsonResponse => {
        this.credit = jsonResponse as Credit;
    
        if (this.credit.movie && typeof this.credit.movie.id === 'number') { 
        this.loadMovieDetails(this.credit.movie.id);

        if (this.credit.actor && typeof this.credit.actor.id ==='number') {
          this.loadActorDetails(this.credit.actor.id);
        }
        }
      });
    
    }

    loadMovieDetails(movieId: number): void {
      this.movieService.getById(movieId).subscribe(jsonResponse => {
        this.movie = jsonResponse as Movie;
  
        // After loading movie details, set the image
        this.loadMovieImage();
      });
    }

    loadActorDetails(actorId: number): void {
      this.actorService.getById(actorId).subscribe(jsonResponse => {
        this.actor = jsonResponse as Actor;

        this.loadActorImage();
      })
    }

    loadMovieImage(): void {
      const imageUrl = `../../assets/${this.movie.title}.jpg`;
  
      // Create a Promise to handle image loading
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
  
      // Wait for the image to load before setting actorImageLoaded
      imageLoadPromise.then(() => {
        this.movieImageLoaded = true;
      });
    }
  
    loadActorImage(): void {
      const imageUrl = `../../assets/${this.actor.firstName}_${this.actor.lastName}.jpg`;
  
      // Create a Promise to handle image loading
      const imageLoadPromise = new Promise<boolean>((resolve) => {
        const image = new Image();
        image.src = imageUrl;
  
        // Use the onload event to check when the image is loaded
        image.onload = () => {
          if (image.naturalWidth > 0) {
            this.actor.imageUrl = imageUrl;
          } else {
            this.actor.imageUrl = '../../assets/default.png';
          }
          this.actorImageLoaded = true;
          resolve(true);
        };
  
        image.onerror = () => {
          this.actor.imageUrl = '../../assets/default.png';
          this.actorImageLoaded = true;
          resolve(true);
        };
      });
  
      // Wait for the image to load before setting actorImageLoaded
      imageLoadPromise.then(() => {
        this.actorImageLoaded = true;
      });
    }


    isDefaultImage(): boolean {
      return this.movie.imageUrl === '../../assets/default.png';
    }

    delete() {
      this.creditService.delete(this.id).subscribe(jsonResponse => {
        this.credit = jsonResponse as Credit;
        this.location.back();
      })
    }

    onBackClick() {
      this.location.back();
    }
}
