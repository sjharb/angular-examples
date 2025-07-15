import { Component, ComponentRef, createComponent, effect, inject, Input, input, signal, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonRequestService, RequestData, ResponseData, MessageData, LlmModels } from '../json-request-service/json-request-service';
import { switchMap } from 'rxjs/operators';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeService } from '../theme-service/theme-service';

// interface RequestData {
//   model: string;
//   prompt: string;
//   messages: string[];
//   stream: boolean;
// }

// interface ResponseData {
//   model: string;
//   created_at: string;
//   response: string,
//   done: string
// }

@Component({
  standalone: true,
  selector: 'app-json-request',
  imports: [MatInputModule],
  templateUrl: './json-request.html',
  styleUrl: './json-request.css'
})
export class JsonRequest {
  modelValue: string = "";

  private jsonRequestService = inject(JsonRequestService);

  @Input({ required: true }) selectedLlmModel!: string;

  themeService = inject(ThemeService);

  // constructor() {
  //   effect(() => {
  //     console.log(`json-request.ts: The themeServiceTheme is: ${this.themeService.themeServiceTheme()}`);
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges: this.selectedLlmModel = " + this.selectedLlmModel);
    this.modelValue = this.selectedLlmModel;
    if (this.selectedLlmModel === undefined) {
      this.modelValue = LlmModels[0];
    } else {
      this.modelValue = this.selectedLlmModel;
    }
    
    console.log("ngOnChanges: this.modelValue = " + this.modelValue);
  }


  //chatMesages: string[] = []
  //chatMesages: Map<string, string>[] = [];
  chatMesages: Array<MessageData> = [];//MessageData[] = [];
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
    let messageToAdd: MessageData = {
      role: "user",
      content: promptValue
    }

    this.chatMesages.push(messageToAdd);
    let requestData: RequestData = {
      model: this.modelValue,//"deepseek-r1:latest",
      //prompt: "What color is grass?",
      prompt: promptValue,
      messages: this.chatMesages,
      stream: false
    };

    console.log('Request Data:', requestData);

    //requestData.prompt = promptValue;
    this.submitForm(requestData)

    console.log('Prompt Value:', promptValue);
    console.log('Model Value:', this.modelValue);
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

  submitForm(requestData: RequestData) {
    this.statusMessage = 'Thinking...';
    //this.promptResponse.update(currentPrompts => [...currentPrompts, "Prompt: '" + promptValue.prompt + "'\n"]);
    //this.promptResponse.set("Prompt:\n'" + promptValue.prompt + "'\n");
    this.promptResponse.update(currentPrompts => currentPrompts + "Prompt:\n'" + requestData.prompt + "'\n");
    this.jsonRequestService.sendData(requestData).subscribe({
      next: (responseData: ResponseData) => {
        this.chatMesages.push(responseData.message);
        //this.promptResponse.set(responseData.response);
        //this.promptResponse.update(currentPrompts => [...currentPrompts, responseData.response + "\n"]);
        //this.promptResponse.set("Response:\n'" + responseData.response + "'\n");
        this.promptResponse.update(currentPrompts => currentPrompts + "\n'" + responseData.message.content + "'\n");

        console.log(responseData);
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


