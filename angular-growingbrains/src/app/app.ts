import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
// import { JsonRequest } from './json-request/json-request';
import { AppSideNav } from "./app-side-nav/app-side-nav";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  imports: [AppSideNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly pageTitle = signal('angular-growingbrains');
}
