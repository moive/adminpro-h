import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: ``,
})
export class IncreaseComponent {
  @Input('valueInitial') progress: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return (this.progress = 0);
    }
    this.outputValue.emit(this.progress + value);
    return (this.progress += value);
  }

  onChange(value: number) {
    if (value >= 100) this.progress = 100;
    else if (value <= 0) this.progress = 0;
    else this.progress = value;
    this.outputValue.emit(this.progress);
  }
}
