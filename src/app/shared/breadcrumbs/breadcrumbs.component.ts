import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``,
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  titleSub$: Subscription = new Subscription();

  constructor(private router: Router) {
    this.titleSub$ = this.getDataParams().subscribe(({ title }) => {
      this.title = title;
      document.title = `Admin Pro ${title}`;
    });
  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getDataParams() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event) => event.snapshot.firstChild === null),
      map((ev) => ev.snapshot.data)
    );
  }
}
