import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  @ViewChild('clave') clave: ElementRef;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
      this.clave.nativeElement.focus();
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1049010283951-ajtdkpvleub4nfd04rvbo1bcl7rlgiig.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( elemento: any ) {
    this.auth2.attachClickHandler( elemento, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
    });
  }

  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    console.log(forma.value);
    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
                        .subscribe( () => this.router.navigate(['/dashboard']) );
  }
}
