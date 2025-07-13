import { Component, inject, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonRequestService } from '../jsonRequest/json-request-service';
import { switchMap } from 'rxjs/operators';

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

@Component({
  standalone: true,
  selector: 'app-json-request',
  imports: [],
  templateUrl: './json-request.html',
  styleUrl: './json-request.css'
})
export class JsonRequest {
  private jsonRequestService = inject(JsonRequestService);
  public promptResponse: string = '';
  //inputPrompt = input<string>();  
  inputValue: string = '';

  // static readonly requestData: RequestData = {
  //   model: "deepseek-r1:latest",
  //   //prompt: "What color is grass?",
  //   prompt: "hello?",
  //   stream: false
  // };
  ngOnInit() {
    console.log("ngOnInit");
    // const requestData: RequestData = {
    //     model: "deepseek-r1:latest",
    //     prompt: "What color is grass?",
    //   };

    // this.jsonRequestService.sendPrompt(JsonRequest.requestData).subscribe(
    //   //value => console.log(value),
    // );

    //const myObservable = this.jsonRequestService.sendData(JsonRequest.requestData);
    //console.log(this.jsonRequestService.sendData(JsonRequest.requestData));

    //this.submitForm(JsonRequest.requestData);

    // const myObservable<ResponseData> = this.jsonRequestService.sendDataAndReceiveUpdates(JsonRequest.requestData);
    // console.log("Observable = " + myObservable.response);
    //this.promptResponse = '';

    //his.inputPrompt = input.required<string>();

    //this.submitForm(JsonRequest.requestData);    


  }

  submitValue(promptValue: string) {
    let requestData: RequestData = {
      model: "deepseek-r1:latest",
      //prompt: "What color is grass?",
      prompt: promptValue,
      stream: false
    };
    //requestData.prompt = promptValue;
    this.submitForm(requestData)

    console.log('Prompt Value:', promptValue);
  }

  // submitForm(formData: any) {
  //   this.jsonRequestService.postData(formData).subscribe({
  //     next: (response) => {
  //       console.log('Data posted successfully:', response);
  //       // Process the received data here
  //     },
  //     error: (error) => {
  //       console.error('Error posting data:', error);
  //       // Handle errors here
  //     }
  //   });
  // }

  // submitPrompt(formData: any) {
  //   // let myObservable = this.jsonRequestService.sendData(formData);
  //   // this.promptResponse = myObservable.response;
  //   let myObservable = new Observable<RequestData>(observer => {
  //   sendData(() => observer.next(new Date().toString()), 1000);
  // });
  // }

  submitForm(promptValue: RequestData) {
    this.promptResponse = 'thinking...';
    this.jsonRequestService.sendData(promptValue).subscribe(responseData => {
      this.promptResponse = responseData.response;
      console.log(responseData.response);
    });
  }

  // let myObservable = this.jsonRequestService.sendData(JsonRequest.requestData);
  // promptResponse = myObservable[response];
  //}
}


