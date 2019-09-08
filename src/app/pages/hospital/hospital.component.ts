import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistrados: number = 0;
  cargando: boolean = true;
  desde: number = 0;


  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {
    this.cargarHospitales();
   }

  ngOnInit() {
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cambiarDesde(desde: number) {
    const destino = this.desde + desde;
    if ( destino < 0) {
      return;
    }

    if (destino >= this.totalRegistrados) {
      return;
    }

    this.desde += desde;
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
                         .subscribe( (resp: any) => {
                           console.log(resp.hospitales);
                           this.hospitales = resp.hospitales;
                           this.totalRegistrados = resp.total;
                           this.cargando = false;
                         });
  }

  buscarHospitales(terminoBusqueda: string) {
    this.cargando = true;
    if (terminoBusqueda.length < 3) {
      this.cargarHospitales();
      return;
    }
    console.log(terminoBusqueda);

    setTimeout( () => {
      this._hospitalService.buscarHospital(terminoBusqueda)
                           .subscribe( (hospitales: Hospital[]) => {
                             console.log('buscar hospitales', hospitales);
                             this.hospitales = hospitales;
                             this.cargando = false;
                           });
    }, 500);
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarhospital(hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
                            .subscribe( () => this.cargarHospitales());
      }
    });
  }

  crearHospital() {
    swal('Ingrese un nombre para un nuevo hospital:', {
      content: 'input',
    }).then( nombreHospital => {
      this._hospitalService.crearHospital(nombreHospital)
                          .subscribe( () => this.cargarHospitales());
    });
  }
}
