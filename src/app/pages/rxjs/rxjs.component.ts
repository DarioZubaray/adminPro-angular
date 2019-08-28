import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.getObservable()
        // .pipe(retry(1))
        .subscribe(
          numero => console.log('subs: ', numero),           // Next
          error => console.error('ocurrió un error', error), // Error
          () => console.log('Subscripción finalizada')       // Complete
        );
   }

  ngOnInit() {
  }

  getObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if (contador === 2) {
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (resp, index) => {
        if ( (resp % 2) === 1) {
          // impar
          return true;
        } else {
          //par
          return false;
        }
      })
    );
  }
}
