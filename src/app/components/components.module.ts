import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreaseComponent } from './increase/increase.component';

@NgModule({
  declarations: [IncreaseComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncreaseComponent],
})
export class ComponentsModule {}
