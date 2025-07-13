import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { JsonRequest } from './json-request/json-request';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  imports: [JsonRequest],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-growingbrains');
}
