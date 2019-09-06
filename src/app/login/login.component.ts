import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  @ViewChild('clave') clave: ElementRef;
  recuerdame: boolean = false;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
      this.clave.nativeElement.focus();
    }
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
