import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeServiceTheme = signal('');

  theme: string = 'dark';

  //public theme = new Subject<string>(); // Or any data type

  // Observable for components to subscribe to
  //themeEmitted$ = this.theme.asObservable();

   toggleThemeFireEvent(data: string) {
    console.log("theme-service.ts: toggleThemeFireEvent: data = " + data);
     //this.theme.next(data); // Emit the data
     //this.themeServiceTheme.set(data);
     this.theme = data;
   }
}