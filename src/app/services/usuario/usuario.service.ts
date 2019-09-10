import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarLocalStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
                    .pipe(
                      map( (resp: any) => {
                        this.guardarLocalStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
                        this.guardarLocalStorage(resp.id, resp.token, usuario, resp.menu);
                        return true;
                      })
                    ).pipe(
                      catchError( err => {
                        swal('Error login', err.error.mensaje, 'error');
                        throw err;
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
                    ).pipe(
                      catchError( err => {
                        swal(err.errors.mensaje, err.error.errors.message, 'error');
                        throw err;
                      })
                    );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        if (usuario._id === this.usuario._id) {
                          this.guardarLocalStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
                        }
                        swal('Usuario actualizado', usuario.nombre, 'success');
                        return true;
                      })
                    ).pipe(
                      catchError( err => {
                        swal(err.errors.mensaje, err.error.errors.message, 'error');
                        throw err;
                      })
                    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.SubirArchivo(archivo, 'usuarios', id)
                             .then( (resp: any) => {
                               this.usuario.img = resp.usuario.img;
                               swal(resp.mensaje, this.usuario.nombre, 'success');
                               this.guardarLocalStorage(id, this.token, this.usuario, this.menu);
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

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
                    .pipe(
                      map( resp => {
                        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                        return true;
                      })
                    );
  }
}
