import { Component } from '@angular/core';
import { SidebarService, UserService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems: any[] = [];
  imgUrl: string = '';

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
  ) {
    this.menuItems = this.sidebarService.menu;
    this.imgUrl = this.userService.user?.imageUrl || '';
  }
}
