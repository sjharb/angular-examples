import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const LlmModels: string[] = [
  "qwen3:0.6b",
  "deepseek-r1:1.5b",
  "deepseek-r1:latest"
];

// export enum llmModels {
//   QWEN3_0_6b = "qwen3:0.6b",
//   DEEPSEEK_R1_1_5_b = "deepseek-r1:1.5b",
//   DEEPSEEK_LATEST = "deepseek-r1:latest",
// }

export interface RequestData {
  model: string;
  prompt: string;
  messages: Array<MessageData>;//MessageData[];
  stream: boolean;
}

export interface ResponseData {
  model: string;
  created_at: string;
  //message: { [key: string]: string}; // {"role", "content"}
  message: MessageData;//Map<string, string>;
  response: string;
  done: string;
}

export interface MessageData {
  role: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonRequestService {
  constructor(private http: HttpClient) { }

  llmAddress: string = 'http://31.97.100.201:11434/api/';
  llmGenerateOrChat: string = 'chat';

  // getData(): Observable<ResponseData[]> {
  //   return this.http.get<ResponseData[]>('http://31.97.100.201:11434/');
  // }

  // sendPrompt(data: RequestData): Observable<ResponseData[]> {
  //   //return this.http.post<ResponseData>('http://31.97.100.201:11434/', data);
  //   //http://31.97.100.201:11434/api/generate
  //   return this.http.post<ResponseData[]>(this.getLlmUrl(), data);
  // }

  sendData(data: RequestData): Observable<ResponseData> {
    //return this.http.post<ResponseData>('http://31.97.100.201:11434/', data);
    //http://31.97.100.201:11434/api/generate
    return this.http.post<ResponseData>(this.getLlmUrl(), data).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage); // Log the error for debugging
    return throwError(() => new Error(errorMessage)); // Re-throw it as an RxJS error
  }

  // postData(data: any): Observable<any> {
  //   const url = 'http://31.97.100.201:11434/';
  //   return this.http.post(url, data);
  // }

  getLlmUrl() {
    return this.llmAddress + this.llmGenerateOrChat;
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
