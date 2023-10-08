import { Component } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css']
})
export class ActorCreateComponent {
pageTitle: string = "Actor Create";
actor: Actor = new Actor();
errorMessage: string = '';



constructor(private actorService: ActorService,
  private route: ActivatedRoute, 
  private router: Router, private datePipe: DatePipe,
  private location: Location) { }


create() {
  this.actor.gender = this.actor.gender.toUpperCase();

  this.actorService.create(this.actor).subscribe(jsonResponse => {
      this.actor = jsonResponse as Actor;
      this.router.navigate(['/actors/list']);
    },
    (errorResponse) => {
      if (errorResponse.status === 409) {
        this.errorMessage = 'ACTOR ALREADY EXISTS';
      } else {
        this.errorMessage = 'AN ERROR OCCURRED WHILE CREATING ACTOR';
      }
    }
  
    );
}

onCancelClick() {
  this.location.back();
}
}
