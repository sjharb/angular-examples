import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface MyData {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonRequestService {
  constructor(private http: HttpClient) { }

  getData(): Observable<MyData[]> {
    return this.http.get<MyData[]>('http://31.97.100.201:11434/');
  }

  sendData(data: any): Observable<any> {
    return this.http.post('http://31.97.100.201:11434/', data);
  }

  ngOnInit() {
    this.getData().subscribe(
      data => {
        console.log('Received data:', data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
