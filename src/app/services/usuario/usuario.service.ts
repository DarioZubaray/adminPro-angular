import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarLocalStorage();
   }

  estaLoguedo() {
    return ( this.token );
  }

  cargarLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarLocalStorage( id: string, token: string, usuario: Usuario) {
    console.log('guardando en el localStorage: ', id, token, usuario);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
                    .pipe(
                      map( (resp: any) => {
                        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
                        return true;
                      })
                    );
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

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        this.guardarLocalStorage(resp.usuario._id, this.token, resp.usuario);
                        swal('Usuario actualizado', usuario.nombre, 'success');
                        return true;
                      })
                    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.SubirArchivo(archivo, 'usuarios', id)
                             .then( (resp: any) => {
                               this.usuario.img = resp.usuario.img;
                               swal(resp.mensaje, this.usuario.nombre, 'success');
                               this.guardarLocalStorage(id, this.token, this.usuario);
                             }).catch( error => console.log(error));
  }

  cargarUsuarios( desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino ;

    return this.http.get(url).pipe(map( (resp: any) => resp.usuarios));
  }
}
