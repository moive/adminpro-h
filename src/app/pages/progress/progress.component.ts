import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progress1: number = 15;
  progress2: number = 35;

  get getPercentage1() {
    return `${this.progress1}%`;
  }
  get getPercentage2() {
    return `${this.progress2}%`;
  }
}
