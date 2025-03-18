// social.page.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  standalone: false
})
export class SocialPage {
  user: any = null; // Almacena la información del usuario

  constructor(private authService: AuthService) {
    // Suscribirse a los cambios del usuario
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  // Método para iniciar sesión con GitHub
  loginWithGithub() {
    this.authService.loginWithGitHub();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}