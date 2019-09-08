import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: any;

  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  subirImagen() {
    this._subirArchivoService.SubirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
                             .then( resp => {
                               this._modalUploadService.notificacion.emit(resp);
                               this.cerrarModal();
                             }).catch( err => console.log('error en la carga', err));
  }

  seleccionImagen( archivo ) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemporal = null;
    this._modalUploadService.ocultarModal();
  }

}
