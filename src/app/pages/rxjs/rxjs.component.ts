import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    const obs = new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          observer.error('Auxilio!');
        }
      }, 1000);
    });

    obs.subscribe(
      numero => console.log('subs: ', numero),           // Next
      error => console.error('ocurrió un error', error), // Error
      () => console.log('Subscripción finalizada')       // Complete
    );
   }

  ngOnInit() {
  }

}
