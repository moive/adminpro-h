import { Component } from '@angular/core';


@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: ``,
})
export class Graphic1Component {
  public colors1: string[] = ['#F3C623', '#10375C', '#EB8317'];
  public colors2: string[] = ['orange', 'yellow', 'tomato'];
  public labels1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data1 = [25, 25, 50];
  public labels2: string[] = ['Coffe', 'Milk', 'Tea'];
  public data2 = [15, 10, 5];
  public labels3: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data3 = [350, 450, 100];
  public labels4: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data4 = [350, 450, 100];
}
