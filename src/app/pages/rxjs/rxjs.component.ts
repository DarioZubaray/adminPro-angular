import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.getObservable().pipe(retry(1)).subscribe(
      numero => console.log('subs: ', numero),           // Next
      error => console.error('ocurrió un error', error), // Error
      () => console.log('Subscripción finalizada')       // Complete
    );
   }

  ngOnInit() {
  }

  getObservable(): Observable<number> {
    return new Observable( (observer: Subscriber<number>) => {
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
  }
}
