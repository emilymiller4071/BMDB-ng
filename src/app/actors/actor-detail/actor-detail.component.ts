import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  pageTitle: string = "Actor Detail";
  actor: Actor = new Actor();
  id: number = 0;
  actorImageLoaded: boolean = false;

  constructor(private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.actorService.getById(this.id).subscribe(jsonResponse =>
      this.actor = jsonResponse as Actor);
    this.loadActorImage();
  }

  loadActorImage(): string {
    let imageUrl = `../../assets/${this.actor.firstName}_${this.actor.lastName}.jpg`;

    // Create an image object to check if the image exists
    const image = new Image();
    image.src = imageUrl;

    // Use the onload event to check when the image is loaded
    image.onload = () => {
      if (image.naturalWidth > 0) {
        this.actor.imageUrl = imageUrl;
      }
      this.actorImageLoaded = true;
    };

    return imageUrl;
  }
}

