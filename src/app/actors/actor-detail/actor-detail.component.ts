import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.actorService.getById(this.id).subscribe(jsonResponse => {
      this.actor = jsonResponse as Actor;
      this.loadActorImage();
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
    return this.actor.imageUrl === '../../assets/default.png';
  }

  delete() {
    this.actorService.delete(this.id).subscribe(jsonResponse =>
      this.router.navigateByUrl('actors/list'));
  }
}