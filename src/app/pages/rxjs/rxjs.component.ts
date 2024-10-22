import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``,
})
export class RxjsComponent {
  constructor() {


    this.returnObservable().pipe(retry(1)).subscribe({
      next: (value) => console.log('Subs: ', value),
      error: (error) => console.error(error),
      complete: () => console.info('Obs finished 🤙'),
    });
  }

  returnObservable(): Observable<number>{
    return new Observable<number>((observer) => {
      let i = -1;
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i == 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i == 2) {
          observer.error('Syntax error');
        }
      }, 1000);
    });
  }
}
