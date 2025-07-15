import { Component, effect, HostBinding, inject, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
// import { JsonRequest } from './json-request/json-request';
//import { AppSideNav } from "./app-side-nav/app-side-nav";
import { MainController } from "./main-controller/main-controller";
import { ThemeService } from './theme-service/theme-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThemeController } from "./theme-controller/theme-controller";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  imports: [MainController,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly pageTitle = signal('angular-growingbrains');
  
  themeService = inject(ThemeService);

  // constructor() {
  //   effect(() => {
  //     console.log(`app.ts: The themeServiceTheme is: ${this.themeService.themeServiceTheme()}`);
  //   });
  // }
}
