import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Credit } from 'src/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { Location } from '@angular/common';


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
  credit: Credit = new Credit;
  credits: Credit[] =[];
  errorMessage: string = "";

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe,
    private creditService: CreditService, private location: Location) {}


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
      this.router.navigateByUrl('actors/list'),
      error => {
        if (error) {
          this.errorMessage = 'THERE WAS AN ERROR DELETING THIS ACTOR'
        }
      });
  }

  getByActorId() {
    this.route.params.subscribe(params => this.id = params['id']);
  
    this.creditService.getByActorId(this.id).subscribe(
      jsonResponse => {
        this.credits = jsonResponse as Credit[];
        this.errorMessage = ''; 
  
        this.router.navigate([`/credits/actor/${this.actor.id}`]);
      },
      error => {
        if (error.status === 404) {
          this.errorMessage = '** NO ROLES FOUND FOR THIS ACTOR **';
        } else {
          this.errorMessage = 'An error occurred while fetching roles.';
        }
      }
    );
  }
  

  onBackClick() {
    this.location.back();
  }
}