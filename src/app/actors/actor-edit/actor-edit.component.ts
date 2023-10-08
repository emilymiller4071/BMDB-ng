import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit{
  pageTitle: string = "Actor Edit";
  actor: Actor = new Actor;
  id: number = 0;
  errorMessage: string = '';

  constructor(private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.actorService.getById(this.id).subscribe(jsonResponse => {
      this.actor = jsonResponse as Actor;
  });
}

  update() {
    this.actorService.update(this.actor).subscribe(
      (updatedActor: Actor) => {
        // Update the local movie object with the new values returned from the server
        this.actor = updatedActor;
        // Redirect to movie detail page with updated movie object
        this.router.navigate([`/actors/${this.actor.id}`]);
      },
      error => {
        if (error.status === 500) {
          this.errorMessage = 'THERE WAS AN ISSUE UPDATING THIS ACTOR';
        }
      }
    );
  }

  delete() {
    this.actorService.delete(this.id).subscribe( jsonResponse =>
      this.router.navigateByUrl('actors/list'));
  }

  onCancelClick() {
    this.location.back();
  }
}