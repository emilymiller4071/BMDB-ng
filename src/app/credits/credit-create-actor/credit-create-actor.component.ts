import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Credit } from 'src/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-credit-create-actor',
  templateUrl: './credit-create-actor.component.html',
  styleUrls: ['./credit-create-actor.component.css']
})
export class CreditCreateActorComponent implements OnInit{
  pageTitle: string = "Credit Create Actor";
  credit: Credit = new Credit();
  credits: Credit[] = [];
  actor: Actor = new Actor();
  movies: Movie[] = [];
  movie: Movie = new Movie();
  id: number = 0;
  selectedMovieId: number = 0;

  constructor(private creditService: CreditService,
    private movieService: MovieService, private actorService: ActorService,
    private route: ActivatedRoute, private router: Router,
    private location: Location) {}


    ngOnInit(): void {
      this.movieService.getAll().subscribe(jsonResponse => {
        this.movies = jsonResponse as Movie[];
      })

      this.route.params.subscribe(params => this.id = params['id']);

      this.actorService.getById(this.id).subscribe(actorResponse => {
        this.actor = actorResponse as Actor;


      })
    }

    create() {
      this.route.params.subscribe(params => {
        const actorId = params['id'];

        // Set the actor ID in the credit object
        this.credit.actor = new Actor();
        this.credit.actor.id = actorId;

        if(this.selectedMovieId) {
          this.movieService.getById(this.selectedMovieId).subscribe(movieResponse => {
            this.movie = movieResponse as Movie;

            // set the movie in credit object
            this.credit.movie = this.movie;


            this.credit.movie = this.movie;

            this.creditService.create(this.credit).subscribe(creditResponse => {
              this.credit = creditResponse as Credit;

              this.router.navigateByUrl(`credits/list/${this.credit.actor.id}`)
            })
          })
        }
      })
    }

    onCancelClick() {
      this.location.back();
    }
}
