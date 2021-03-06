import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/imagenes';
    if ( !img ) {
      return url + '/tipo/imagen-no-encontrada';
    }
    if ( img.indexOf('https://') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      case 'medicos':
        url += '/medicos/' + img;
        break;
      case 'hospitales':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe: ' + tipo);
        url += '/tipo/tipo-invalido';
    }
    return url;
  }

}
