import { Component, OnInit } from '@angular/core';
import { SearchService, UserService } from '../../../services';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public loading: boolean = true;

  public from: number = 0;

  get isPreviousDisabled(): boolean {
    return this.from === 0;
  }

  get isNextDisabled(): boolean {
    return this.from + 5 >= this.totalUsers;
  }

  constructor(
    private userService: UserService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;

      this.users = users;
      this.usersTemp = users;
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

  search(q: string) {
    if (q.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchService.search('users', q).subscribe((users) => {
      this.users = users;
    });
  }

  isExternal(url: string): boolean {
    if (!url) return false;

    // 🔹 1. URLs relativas (internas)
    if (url.startsWith('/')) return false;

    try {
      const parsed = new URL(url);

      // 🔹 2. mismo hostname (aunque cambie puerto)
      if (parsed.hostname === window.location.hostname) {
        return false;
      }

      // 🔹 3. todo lo demás = externo
      return true;
    } catch {
      return false;
    }
  }
}
