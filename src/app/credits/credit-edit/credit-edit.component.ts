import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { Movie } from 'src/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css']
})
export class CreditEditComponent implements OnInit{
  pageTitle: string = "Credit Edit";
  credit: Credit = new Credit();
  actor: Actor = new Actor();
  movie: Movie = new Movie();
  id: number = 0;
  
  constructor(private creditService: CreditService,
    private movieService: MovieService, private actorService: ActorService,
    private route: ActivatedRoute, private router: Router,
    private location: Location) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.creditService.getById(this.id).subscribe(jsonResponse => {
      this.credit = jsonResponse as Credit;
    })
  }

  update() {
    this.route.params.subscribe(params => this.id = params['id']);
    this.creditService.update(this.credit).subscribe(jsonResponse => {
      this.credit = jsonResponse as Credit;
      this.router.navigateByUrl('/movies/list');
    })
  }

  onCancelClick() {
    this.location.back();
  }

  delete() {
    this.creditService.delete(this.id).subscribe(jsonResponse => {
      this.router.navigateByUrl('/movies/list');
    })
  }
}
