import { Component, ComponentRef, createComponent, inject, Input, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonRequestService } from '../json-request-service/json-request-service';
import { switchMap } from 'rxjs/operators';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';

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
  imports: [MatInputModule],
  templateUrl: './json-request.html',
  styleUrl: './json-request.css'
})
export class JsonRequest {

  private jsonRequestService = inject(JsonRequestService);
  //public promptResponse: string = '';
  dynamicComonent = ComponentRef;
  //promptResponse = signal<string[]>([]);
  promptResponse = signal<string>('');
  //inputPrompt = input<string>();  
  inputValue: string = '';
  statusMessage: string | null = 'Waiting for a prompt...';

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
    this.statusMessage = 'Thinking...';
    //this.promptResponse.update(currentPrompts => [...currentPrompts, "Prompt: '" + promptValue.prompt + "'\n"]);
    //this.promptResponse.set("Prompt:\n'" + promptValue.prompt + "'\n");
    this.promptResponse.update(currentPrompts => currentPrompts + "Prompt:\n'" + promptValue.prompt + "'\n");
    this.jsonRequestService.sendData(promptValue).subscribe({
      next: (responseData) => {
        //this.promptResponse.set(responseData.response);
        //this.promptResponse.update(currentPrompts => [...currentPrompts, responseData.response + "\n"]);
        //this.promptResponse.set("Response:\n'" + responseData.response + "'\n");
        this.promptResponse.update(currentPrompts => currentPrompts + "\n'" + responseData.response + "'\n");

        console.log(responseData.response);
        this.statusMessage = 'Waiting for another prompt...';
      },
      error: (error) => {
        console.error('Error creating item:', error);
        this.statusMessage = error.message;
      }
    });
  }

  clearResponseText() {
    //this.promptResponse.set([]);
    this.promptResponse.set('');
  }

  // async addComponent() {
  //   class RootComponent {}
  //   const applicationRef = await bootstrapApplication(RootComponent);
  //   const hostElement = document.getElementById('dynamicComonent');
  //   const environmentInjector = applicationRef.injector;
  //   const componentRef = createComponent(JsonRequest, {hostElement, environmentInjector});
  //   applicationRef.attachView(componentRef.hostView);
  //   componentRef.changeDetectorRef.detectChanges();
  // }

  // let myObservable = this.jsonRequestService.sendData(JsonRequest.requestData);
  // promptResponse = myObservable[response];
  //}
}


