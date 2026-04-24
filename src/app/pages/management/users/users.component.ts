import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public loading: boolean = true;

  public from: number = 0;

  get isPreviousDisabled(): boolean {
    return this.from === 0;
  }

  get isNextDisabled(): boolean {
    return this.from + 5 >= this.totalUsers;
  }

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;

      users.length !== 0 && (this.users = users);
      this.loading = false;
    });
  }

  openModal(user: User) {
    //
  }
  onChangeRole(user: User) {
    //
  }
  removeUser(user: User) {
    //
  }
  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }
}
