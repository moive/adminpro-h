import { Component, computed, Signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  year: number = new Date().getFullYear();
  description: Signal<string> = computed<string>(
    () => `© ${this.year} Admin Pro by wrappixel.com`
  );
}
