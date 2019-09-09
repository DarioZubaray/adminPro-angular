import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico();
  hospitales: Hospital[] = [];

  constructor(public _medicoService: MedicoService, public _hospitalService: HospitalService) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
                         .subscribe( (resp: any) => {
                           this.hospitales = resp.hospitales;
                          });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      console.log('formulario invalido');
      return;
    }
    console.log(this.medico);
    this._medicoService.guardarMedico(this.medico).subscribe(resp => console.log(resp));
  }
}
