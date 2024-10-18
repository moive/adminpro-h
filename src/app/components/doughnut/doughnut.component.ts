import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: ``,
})
export class DoughnutComponent implements OnChanges {
  @Input() title: string = 'Untitle';
  @Input() data: number[] = [];
  @Input() labels: string[] = [];

  @Input() colors: Color[] = ['#ff6384', '#36a2eb', '#cc65fe'];
  public doughnutChartLabels: string[] = ['label1', 'label2', 'label3'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [2, 3, 10], //this.data,
        backgroundColor: this.colors,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartLabels = this.labels;

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
    };
  }
}
