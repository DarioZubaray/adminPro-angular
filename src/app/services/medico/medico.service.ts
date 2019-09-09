import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos:  number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
                    .pipe(
                      map( (resp: any) => {
                        this.totalMedicos = resp.total;
                        return resp.medicos;
                      })
                    );
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino ;

    return this.http.get(url).pipe(map( (resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                    .pipe(
                      map( (resp: any) => {
                        swal('Medicos borrado', resp.medico.nombre, 'success');
                        return resp.medico;
                      })
                    );
  }

  guardarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico?token=' + this._usuarioService.token;

    return this.http.post(url, medico)
                    .pipe(
                      map( (resp: any) => {
                        console.log(resp);
                        swal('Medico creado!', resp.medico.nombre, 'success');
                        return resp.medico;
                      })
                    );
  }
}
