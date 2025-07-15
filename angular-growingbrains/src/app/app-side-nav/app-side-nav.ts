import { Component, effect, ElementRef, inject, Input, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { JsonRequest } from '../json-request/json-request';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';
import { MatOption } from '@angular/material/autocomplete';
import { LlmModels } from '../json-request-service/json-request-service';
import { MatSelect } from '@angular/material/select';
import { ThemeController } from "../theme-controller/theme-controller";
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme-service/theme-service';
//import { MatListItem } from "../../../node_modules/@angular/material/list/index";
//import { llmModels } from '../json-request-service/json-request-service';


@Component({
  selector: 'app-side-nav',
  imports: [CommonModule, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, JsonRequest, MatInputModule, MatFormFieldModule, MatSelect, MatOption, ThemeController],
  templateUrl: './app-side-nav.html',
  styleUrl: './app-side-nav.css'
})
export class AppSideNav {
  llmModels: string[] = LlmModels;
  selectedLlmModel: any;
  //@Input({ required: true }) selectedLlmModel!: string;
  //LlmModels = viewChild<ElementRef>('listLlmModels');
  events: string[] = [];
  opened: boolean = true;
  public llmServerAddressValue: string = '';
  
  isNavButtonDisabled: boolean = false
  sideNavOptionsButtonText: string = 'Options';
  mainOptionsButtonText: string = 'Options';
  //currentTheme: any;
  
  themeService = inject(ThemeService);

  // constructor() {
  //   effect(() => {
  //     console.log(`app-side-nav.ts: The themeServiceTheme is: ${this.themeService.themeServiceTheme()}`);
  //   });
  // }

  sideNavOpened() {
    this.mainOptionsButtonText = ''
    this.isNavButtonDisabled = true;
  }

  sideNavClosed() {
    this.mainOptionsButtonText = '<< Options'
    this.isNavButtonDisabled = false;
  }

  submitAddressValue(addressValue: string) {
    this.llmServerAddressValue = addressValue;
  }

  // currentThemeChanged(currentTheme: string) {
  //   this.currentTheme = currentTheme;
  // }
}
