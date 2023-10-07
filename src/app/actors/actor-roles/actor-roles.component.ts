import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Credit } from 'src/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { throwError } from 'rxjs';




@Component({
  selector: 'app-actor-roles',
  templateUrl: './actor-roles.component.html',
  styleUrls: ['./actor-roles.component.css']
})
export class ActorRolesComponent implements OnInit{
  pageTitle: string = "Actor Roles";
  actor: Actor = new Actor();
  movies: Movie[] = [];
  credits: Credit[] = [];
  credit: Credit = new Credit();
  id: number = 0;


  constructor(private actorService: ActorService,
    private movieService: MovieService, private creditService: CreditService,
    private route: ActivatedRoute, private router: Router,
    private location: Location) {}

    ngOnInit(): void {
     this.route.params.subscribe(params => this.id = params['id']);


     this.actorService.getById(this.id).subscribe(actorResponse => {
      this.actor = actorResponse as Actor;

      this.creditService.getByActorId(this.actor.id).subscribe(creditResponse => {
          this.credits = creditResponse as Credit[]; })
      })
      }

    
    }

