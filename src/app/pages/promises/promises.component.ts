import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: ``,
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    this.initPromise();
  }

  initPromise(): void{
    const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('hello world');
      } else {
        reject('Something went wrong 😥');
      }
    });

    promise
      .then((msg) => {
        console.log(msg);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
    console.log('End promise');
  }
}
