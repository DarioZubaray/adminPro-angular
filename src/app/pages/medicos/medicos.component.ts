import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: any[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.totalRegistros = this._medicoService.totalMedicos;
  }

  cargarMedicos() {
    this.cargando = true;

    setTimeout( () => {
      this._medicoService.cargarMedicos()
                         .subscribe( (medicos: any) => {
                            this.medicos = medicos;
                            this.cargando = false;
                         });
    }, 500);
  }

  buscarMedico( terminoBusqueda: string) {
    if ( terminoBusqueda.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;

    setTimeout( () => {
      this._medicoService.buscarMedico(terminoBusqueda)
                        .subscribe( (medicos: any) => {
                          this.medicos = medicos;
                          this.cargando = false;
                        });
    }, 500);
  }

  mostrarModal( medico: Medico) {

  }

  borrarMedico( medico: Medico) {

  }
}
