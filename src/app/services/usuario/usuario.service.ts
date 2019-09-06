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

  constructor(private http: HttpClient) { }

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
                        localStorage.setItem('id', resp.id);
                        localStorage.setItem('token', resp.token);
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                        return true;
                      })
                    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        swal('Usuario creado', 'usuario.email', 'success');
                        return resp.usuario;
                      })
                    );
  }
}
