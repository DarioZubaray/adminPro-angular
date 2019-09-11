import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1]));

    const expirado = this.tokenEstaExpirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.verificaRenuevatoken(payload.exp);
  }

  tokenEstaExpirado(fechaExpSeg: number) {
    const ahora = new Date().getTime() / 1000;
    return (fechaExpSeg < ahora);
  }

  verificaRenuevatoken(fechaExpSeg: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenFecha = new Date(fechaExpSeg * 1000);
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + 1 * 60 * 60 * 1000);

      if ( tokenFecha.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        // token proximo a vencer
        this._usuarioService.renuevaToken()
                            .subscribe( () => {
                              resolve(true);
                            }, () => {
                              this.router.navigate(['/login']);
                              reject(false);
                            });
      }
    });
  }
}
