import { Component } from '@angular/core';
import { SidebarService, UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems: any[] = [];
  user: User | null = null;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
  ) {
    this.menuItems = this.sidebarService.menu;
    this.user = this.userService.user;
  }
}
