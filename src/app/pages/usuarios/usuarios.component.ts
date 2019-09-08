import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    setTimeout(() => {
      this._usuarioService.cargarUsuarios(this.desde)
                          .subscribe( (resp: any) => {
                            this.totalRegistros = resp.total;
                            if (this.desde >= this.totalRegistros) {
                              this.desde = this.totalRegistros - 5;
                            }
                            this.usuarios = resp.usuarios;
                            this.cargando = false;
                          });
    }, 500);
  }

  cambiarDesde(desde: number) {
    const destino = this.desde + desde;
    if ( destino < 0) {
      return;
    }

    if (destino >= this.totalRegistros) {
      return;
    }

    this.desde += desde;
    this.cargarUsuarios();
  }

  buscarUsuario(terminoBusqueda: string) {
    this.cargando = true;
    if (terminoBusqueda.length < 3) {
      this.cargarUsuarios();
      return;
    }

    setTimeout( () => {
      this._usuarioService.buscarUsuarios(terminoBusqueda)
                          .subscribe( (usuarios: Usuario[]) => {
                            this.usuarios = usuarios;
                            this.cargando = false;
                          });
    }, 500);
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No es posible borrarse a si mismo.', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
                            .subscribe( borrado => this.cargarUsuarios());
      }
    });
  }
}
