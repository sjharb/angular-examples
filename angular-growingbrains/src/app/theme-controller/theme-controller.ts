import { Component, effect, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme-service/theme-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-controller',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './theme-controller.html',
  styleUrl: './theme-controller.css'
})
export class ThemeController {
  //protected readonly pageTitle = signal('angular-growingbrains');

  //@Output() currentTheme: string = 'dark';
  //@Output() currentThemeEvent = new EventEmitter<string>();
  //public currentTheme: string = 'dark';
  //currentTheme: string = 'dark';

  private dataSubscription!: Subscription;

  themeService = inject(ThemeService);

  //darkModeIconName: string = 'dark_mode';
  darkModeIconName = signal('dark_mode');

  // constructor() {
  //   effect(() => {
  //     console.log(`The themeServiceTheme is: ${this.themeService.themeServiceTheme()}`);
  //   });
  // }

  // ngOnInit() {
  //   this.dataSubscription = this.themeService.themeEmitted$.subscribe(data => {
  //     this.currentTheme = data;
  //     console.log("theme-controller.ts: ngOnInit: themeServeice subscribe changed: this.currentTheme = " + this.currentTheme);
  //     //changeTheme(this.currentTheme);
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.dataSubscription) {
  //     this.dataSubscription.unsubscribe(); // Prevent memory leaks
  //   }
  // }

  toggleTheme() {
    console.log("theme-controller.ts: toggleTheme: this.currentTheme: BEFORE = " + this.themeService.theme);
    if (this.themeService.theme === "dark") {
      this.themeService.toggleThemeFireEvent('light');
      this.darkModeIconName.set('light_mode');
      //this.currentThemeEvent.emit('light');
    } else {
      this.themeService.toggleThemeFireEvent('dark');
      this.darkModeIconName.set('dark_mode');
      //this.currentThemeEvent.emit('dark');
    }
    console.log("theme-controller.ts: toggleTheme: this.currentTheme: AFTER  = " + this.themeService.theme);
  }
}
