import { Component } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css']
})
export class ActorCreateComponent {
pageTitle: string = "Actor Create";
actor: Actor = new Actor();




constructor(private actorService: ActorService,
  private route: ActivatedRoute, 
  private router: Router, private datePipe: DatePipe) { }


create() {
  this.actor.gender = this.actor.gender.toUpperCase();

  this.actorService.create(this.actor).subscribe(jsonResponse => {
      this.actor = jsonResponse as Actor;
      this.router.navigate(['/actors/list']);
    }
  );
}

}
