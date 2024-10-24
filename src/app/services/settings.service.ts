import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.getElementById('theme');
  constructor() {
    const url =
      localStorage.getItem('theme') || 'assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    localStorage.setItem('theme', url);
    this.linkTheme?.setAttribute('href', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
