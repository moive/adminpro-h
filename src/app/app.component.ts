import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'adminpro-h';

  ngOnInit(): void {
    customInitFunctions();
  }
}
