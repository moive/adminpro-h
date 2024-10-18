import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';

import { IncreaseComponent } from './increase/increase.component';
import { DoughnutComponent } from './doughnut/doughnut.component';

@NgModule({
  declarations: [IncreaseComponent, DoughnutComponent],
  imports: [CommonModule, FormsModule, BaseChartDirective],
  exports: [IncreaseComponent, DoughnutComponent],
})
export class ComponentsModule {}
