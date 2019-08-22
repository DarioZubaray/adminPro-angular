import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('label')
  public doughnutChartLabels: string[]; // = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')
  public doughnutChartData: number[]; // = [350, 450, 100];
  @Input('type')
  public doughnutChartType: string; // = 'doughnut';
  @Input()
  public leyenda: string;

  constructor() { }

  ngOnInit() {
  }

}
