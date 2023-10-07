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
  selector: 'app-credit-create-movie',
  templateUrl: './credit-create-movie.component.html',
  styleUrls: ['./credit-create-movie.component.css']
})
export class CreditCreateMovieComponent implements OnInit{
pageTitle: string = "Credit Create Movie";
credit: Credit = new Credit();
id: number = 0;
movie: Movie = new Movie();
actor: Actor = new Actor();
actors: Actor[] = [];
selectedActorId: number = 0;
movies: Movie[] = [];
selectedMovieId: number = 0;

constructor(private creditService: CreditService,
  private route: ActivatedRoute, private actorService: ActorService,
  private movieService: MovieService ,private router: Router,
  private location: Location) {}


  ngOnInit(): void {
    
    this.actorService.getAll().subscribe( jsonResponse => {
        this.actors = jsonResponse as Actor[];
      }
    );
    this.route.params.subscribe(params => this.id = params['id']);
    this.movieService.getById(this.id).subscribe(jsonResponse => {
      this.movie = jsonResponse as Movie;
    })
    
  }

  create() {
    this.route.params.subscribe(params => {
      const movieId = params['id']; // Get the movie ID from the URL
  
      // Set the movie ID in the credit object
      this.credit.movie = new Movie();
      this.credit.movie.id = movieId;
  
      if (this.selectedActorId) {
        this.actorService.getById(this.selectedActorId).subscribe(actorResponse => {
          this.actor = actorResponse as Actor;
  
          // Set the actor in the credit object
          this.credit.actor = this.actor;
  
          this.creditService.create(this.credit).subscribe(jsonResponse => {
            this.credit = jsonResponse as Credit;
  
            // After successfully creating the credit, navigate to the credits list
            this.router.navigateByUrl(`/credits/list/${this.credit.movie.id}`);
          });
        });
      }
    });
  }

  onCancelClick() {
    this.location.back();
  }
}
