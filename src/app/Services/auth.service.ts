// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GithubAuthProvider, User, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    // Escuchar cambios en la autenticación
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // Login con GitHub
  async loginWithGitHub() {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user); // Actualizar el estado del usuario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await signOut(this.auth); // Cierra la sesión en Firebase
      this.userSubject.next(null); // Actualiza el estado del usuario a null
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}