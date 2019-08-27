import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contadorEnSegundos(3)
        .then( () => console.log('termino la promesa'))
        .catch( error => console.error('Error en la promesa', error));
   }

  ngOnInit() {
  }

  contadorEnSegundos(cantidad: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === cantidad) {
          resolve();
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
