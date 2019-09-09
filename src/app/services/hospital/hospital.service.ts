import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuarioLogueado: Usuario;
  token: string;

  constructor(public http: HttpClient) {
    this.cargarLocalStorage();
   }

  cargarLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuarioLogueado = null;
    }
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
                    .pipe(
                      map( (resp: any) => {
                        return resp.hospital;
                      })
                    );
  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;

    return this.http.delete(url)
                    .pipe(
                      map( (hospitalBorrado: any) => {
                        swal('Hospital borrado', hospitalBorrado.hospital.nombre, 'success');
                        return true;
                      })
                    );
  }

  crearHospital( nombre: string ) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;

    return this.http.post(url, { nombre })
                    .pipe(
                      map( () => {
                        swal('Hospital creado', nombre, 'success');
                        return true;
                      })
                    );
  }

  buscarHospital( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino ;

    return this.http.get(url).pipe(map( (resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;

    return this.http.put(url, hospital)
                    .pipe(
                      map( () => {
                        swal('Hospital actualizado', hospital.nombre, 'success');
                        return true;
                      })
                    );
  }
}
