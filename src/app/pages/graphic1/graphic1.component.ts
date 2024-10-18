import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: ``,
})
export class Graphic1Component {
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public colors: Color[] = ['#ff6384', '#36a2eb', '#cc65fe'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: this.colors,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
