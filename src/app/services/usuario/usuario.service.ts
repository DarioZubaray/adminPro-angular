import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient) { }

  guardarLocalStorage( id: string, token: string, usuario: Usuario) {
    console.log('guardando en el localStorage: ', id, token, usuario);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
                    .pipe(
                      map( (resp: any) => {
                        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
                        return true;
                      })
                    )
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        this.guardarLocalStorage(resp.id, resp.token, usuario);
                        return true;
                      })
                    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        swal('Usuario creado', usuario.email, 'success');
                        return resp.usuario;
                      })
                    );
  }
}
