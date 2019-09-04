import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    });
   }

  ngOnInit() {
    init_plugins();
  }

  registrarUsuario() {
    console.log( this.forma.value );
  }
}
