import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/service/actor.service';
import { Actor } from 'src/model/actor.class';



@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})

export class ActorListComponent implements OnInit{
  pageTitle: string = "Actor List";
  actors: Actor[] = [];
  actor: Actor = new Actor();

  constructor(private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router) {

      
    }
  ngOnInit() {
     // subscribe to the list of actors we get from the get request
     this.actorService.getAll().subscribe(jsonResponse => {
      // add the data inside the returned jsonResponse to the array of actors
      this.actors = jsonResponse.sort((a, b) => a.lastName.localeCompare(b.lastName));
    })
  }

}
