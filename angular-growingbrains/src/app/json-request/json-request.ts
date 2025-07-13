import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from "@angular/core";
import { JsonRequestService } from '../jsonRequest/json-request-service';

@Component({
  standalone: true,
  selector: 'app-json-request',
  imports: [],
  templateUrl: './json-request.html',
  styleUrl: './json-request.css'
})

// interface MyData {
//       id: number;
//       name: string;
//     }

// @Injectable({
//   providedIn: 'root'
// })
export class JsonRequest {
  //constructor(private jsonRequestService: JsonRequestService)
  private jsonRequestService = inject(JsonRequestService);
  //   constructor(private http: HttpClient) {}

  //   getData(): Observable<MyData[]> {
  //       return this.http.get<MyData[]>('https://api.example.com/data');
  //     }

  //     sendData(data: any): Observable<any> {
  //       return this.http.post('https://api.example.com/submit', data);
  //     }

  //     ngOnInit() {
  //   this.getData().subscribe(
  //     data => {
  //       console.log('Received data:', data);
  //     },
  //     error => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
}


