import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document) {

   }

  ngOnInit() {
  }

  cambiarColor(color: string) {
    const url = `assets/css/colors/${color}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
  }
}
