import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface MyData {
  id: number;
  name: string;
}

interface RequestData {
  model: string;
  prompt: string;
  stream: boolean;
}

interface ResponseData {
  model: string;
  created_at: string;
  response: string,
  done: string
}


@Injectable({
  providedIn: 'root'
})
export class JsonRequestService {
  constructor(private http: HttpClient) { }

  getData(): Observable<ResponseData[]> {
    return this.http.get<ResponseData[]>('http://31.97.100.201:11434/');
  }

  sendPrompt(data: RequestData): Observable<ResponseData[]> {
    //return this.http.post<ResponseData>('http://31.97.100.201:11434/', data);
    //http://31.97.100.201:11434/api/generate
    return this.http.post<ResponseData[]>('http://31.97.100.201:11434/api/generate', data);
  }

  sendData(data: RequestData): Observable<ResponseData> {
    //return this.http.post<ResponseData>('http://31.97.100.201:11434/', data);
    //http://31.97.100.201:11434/api/generate
    return this.http.post<ResponseData>('http://31.97.100.201:11434/api/generate', data);
  }

  postData(data: any): Observable<any> {
    const url = 'http://31.97.100.201:11434/';
    return this.http.post(url, data);
  }

  // sendDataAndReceiveUpdates(data: any): Observable<any> {
  //   return this.http.post('/api/submit-data', data).pipe(
  //     switchMap(() => interval(5000).pipe( // Poll every 5 seconds
  //       switchMap(() => this.http.get('http://31.97.100.201:11434/'))
  //     ))
  //   );
  // }

  //   ngOnInit() {
  //     console.log("ngOnInit");
  //     this.getData().subscribe(
  //       // data => {
  //       //   console.log('Received data:', data);
  //       // },
  //       // error => {
  //       //   console.error('Error fetching data:', error);
  //       // }
  //       value =>console.log(value),

  //     );

  // const requestData: RequestData = {
  //   model: "deepseek-r1:latest",
  //   prompt: "What color is grass?",
  // };

  //     this.sendData(requestData);
  //     console.log( this.sendData(requestData));
  //   }

}
