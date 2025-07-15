import { Component, ComponentRef, createComponent, effect, inject, Input, input, signal, SimpleChanges, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
  // public renderer: Renderer2;
  // private el!: ElementRef;
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  //@ViewChild('responseContainer')
  //@ViewChild('myElement', { static: false }) myElementRef: ElementRef<HTMLDivElement>;

  @ViewChild('responseContainer', { static: false }) responseDiv!: ElementRef<HTMLDivElement>;

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
    this.addRequestDiv(requestData);
    this.jsonRequestService.sendData(requestData).subscribe({
      next: (responseData: ResponseData) => {
        this.chatMesages.push(responseData.message);
        //this.promptResponse.set(responseData.response);
        //this.promptResponse.update(currentPrompts => [...currentPrompts, responseData.response + "\n"]);
        //this.promptResponse.set("Response:\n'" + responseData.response + "'\n");
        this.promptResponse.update(currentPrompts => currentPrompts + "\n'" + responseData.message.content + "'\n");

        console.log("responseData = " + responseData);
        console.log("responseData.response = " + responseData.response);
        this.statusMessage = 'Waiting for another prompt...';

        this.addResponseDiv(responseData);
      },
      error: (error) => {
        console.error('Error creating item:', error);
        this.statusMessage = error.message;
      }
    });
  }

  clearResponseText() {
    // Old response div clear. TODO: Remove me.
    //this.promptResponse.set([]);
    this.promptResponse.set('');

    //For the new response div.
    this.removeAllDivChildren(this.responseDiv);
  }

  removeAllDivChildren(elementRef: ElementRef) {
    if (elementRef) {
      const children = Array.from(elementRef.nativeElement.children);
      children.forEach(child => {
        this.renderer.removeChild(elementRef.nativeElement, child);
      });
    }
  }

  addRequestDiv(requestData: RequestData) {
    // const div = this.renderer.createElement('div');
    // const p = this.renderer.createElement('p');
    // this.renderer.appendChild(div, p);
    // const text = this.renderer.createText("Prompt:\n'" + requestData.prompt + "'");
    // this.renderer.appendChild(p, text);
    const div = this.renderer.createElement('div', 'request-div-body');
    const bLabel = this.renderer.createElement('b');
    this.renderer.appendChild(div, bLabel);
    const labelText = this.renderer.createText("Prompt:");
    this.renderer.appendChild(bLabel, labelText);
    const pContent = this.renderer.createElement('p');
    this.renderer.appendChild(div, pContent);
    const contentText = this.renderer.createText("'" + requestData.prompt + "'");
    this.renderer.appendChild(pContent, contentText);
    this.renderer.appendChild(this.responseDiv.nativeElement, div);
  }

  addResponseDiv(responseData: ResponseData) {
    let thinkMessageSection: string = responseData.message.content.split('</think>')[0];
    let responseMessageSection: string = responseData.message.content.split('</think>')[1];
    thinkMessageSection = thinkMessageSection.split("<think>")[1];
    const div = this.renderer.createElement('div');
    const bLabel = this.renderer.createElement('b');
    this.renderer.appendChild(div, bLabel);
    const labelText = this.renderer.createText("Response:");
    this.renderer.appendChild(bLabel, labelText);
    //const pThinkContent = this.renderer.createElement('p');
    //this.renderer.appendChild(div, pThinkContent);
    const iThinkContent = this.renderer.createElement('i');
    //this.renderer.appendChild(pThinkContent, iThinkContent);
    this.renderer.appendChild(div, iThinkContent);
    const thinkText = this.renderer.createText(thinkMessageSection);
    this.renderer.appendChild(iThinkContent, thinkText);
    const pResponseContent = this.renderer.createElement('p');
    this.renderer.appendChild(div, pResponseContent);
    const responseText = this.renderer.createText(responseMessageSection);
    this.renderer.appendChild(pResponseContent, responseText);
    console.log("thinkMessageSection = " + thinkMessageSection);
    console.log("responseMessageSection = " + responseMessageSection);
    // console.log("this.el = " + this.el);
    // console.log("this.el.nativeElement = " + this.el.nativeElement);
    // console.log("this.el.nativeElement.querySelector('#responseContainer') = " + this.el.nativeElement.querySelector('#responseContainer'));
    // console.log("div = " + div);
    // console.log("this.responseDiv = " + this.responseDiv);
    // console.log("this.renderer.appendChild = " + this.renderer.appendChild);
    //@ViewChild('responseContainer') myDiv: ElementRef;
    //@ViewChild('myElement', { static: false }) myElementRef: ElementRef<HTMLDivElement>;
    //@ViewChild('responseContainer');
    //this.renderer.appendChild(this.el.nativeElement.querySelector('#responseContainer'), div);
    //this.renderer.appendChild(this.responseDiv.nativeElement, div);
    this.renderer.appendChild(this.responseDiv.nativeElement, div);
    //this.renderer.appendChild(div, div);
    //console.log("addResponseDiv");
  }
}


