import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);

  user: User | null = null;
  ngOnInit(): void {
    this.user = this.userService.user;
  }
  logout() {
    this.userService.logout();
    this.revokeGoogleSession();
    this.router.navigate(['/login']);
    // google.accounts.id.revoke('mvelasquezdeveloper@gmail.com', () => {
    //   this.router.navigate(['/login']);
    // });
  }

  private revokeGoogleSession(): void {
    if (typeof google === 'undefined' || !google.accounts?.id) {
      return;
    }

    try {
      // const email = this.userService.user?.email;
      const email = 'mvelasquezdeveloper@gmail.com';

      if (email) {
        google.accounts.id.revoke(email, (response: any) => {
          if (response.successful) {
            console.log('Sesión de Google revocada exitosamente');
          } else {
            console.warn('No se pudo revocar la sesión de Google');
          }
        });
      }
    } catch (error) {
      console.warn('Error al intentar revocar sesión de Google:', error);
    }
  }
}
