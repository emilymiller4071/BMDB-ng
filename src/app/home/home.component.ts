import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pageTitle: string = "Home"


  constructor(private location: Location) {}

}
