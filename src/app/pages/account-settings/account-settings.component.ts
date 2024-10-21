import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: `
    #themecolors .selector{cursor:pointer}
  `,
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.getElementById('theme');
  public links!: NodeListOf<Element>;

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    localStorage.setItem('theme', url);
    this.linkTheme?.setAttribute('href', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach((elem) => {
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
