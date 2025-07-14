import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { JsonRequest } from '../json-request/json-request';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-app-side-nav',
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, JsonRequest, MatInputModule, MatFormFieldModule],
  templateUrl: './app-side-nav.html',
  styleUrl: './app-side-nav.css'
})
export class AppSideNav {
  events: string[] = [];
  opened: boolean = true;
  public llmServerAddressValue: string = '';
  
  isNavButtonDisabled: boolean = false
  sideNavOptionsButtonText: string = 'Options';
  mainOptionsButtonText: string = 'Options';

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
}
