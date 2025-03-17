import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';

declare var google: any;

@Component({
  selector: 'app-google',
  templateUrl: './google.page.html',
  standalone: false,
})
export class GooglePage implements AfterViewInit, OnInit {
  user: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    GoogleAuth.initialize({
      clientId: '331574944182-b7coocbesfi9s94nm2dl7hqjl3gfap2g.apps.googleusercontent.com', // ID de cliente de Android
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    // Cargar usuario desde localStorage si existe
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    // Inicializar Google Auth en Android
    if (Capacitor.isNativePlatform()) {
      GoogleAuth.initialize();
    }
  }

  ngAfterViewInit() {
    // Cargar script de GIS solo en web
    if (!Capacitor.isNativePlatform()) {
      this.loadGoogleScript();
    }
  }

  // Cargar el script de GIS dinámicamente
  private loadGoogleScript() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => this.initializeGIS();
      document.head.appendChild(script);
    } else {
      this.initializeGIS();
    }
  }

  // Inicializar GIS para web
  private initializeGIS() {
    google.accounts.id.initialize({
      client_id: '197199548223-mjhv02bg8sok044scaho6q7o7icfmp48.apps.googleusercontent.com', // Reemplaza con tu ID de cliente web
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt();
  }

  // Manejar el inicio de sesión
  async signIn() {
    if (Capacitor.isNativePlatform()) {
      // Login en Android
      try {
        const user = await GoogleAuth.signIn();
        this.handleUserResponse(user);
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    } else {
      // Login en web
      if (typeof google !== 'undefined') {
        google.accounts.id.prompt();
      }
    }
  }

  // Manejar la respuesta de autenticación
  handleCredentialResponse(response: any) {
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      this.handleUserResponse({
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        imageUrl: payload.picture,
        familyName: payload.family_name,
        givenName: payload.given_name,
      });
    } else {
      console.error('Error during authentication:', response.error);
    }
  }

  // Guardar la información del usuario
  private handleUserResponse(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    console.log('User saved:', this.user);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  // Cerrar sesión
  async signOut() {
    this.user = null;
    localStorage.removeItem('user');

    if (Capacitor.isNativePlatform()) {
      await GoogleAuth.signOut(); // Cerrar sesión en Android
    } else {
      google.accounts.id.disableAutoSelect(); // Cerrar sesión en web
    }

    console.log('User signed out.');

    // Esperar a que Angular actualice la vista
    setTimeout(() => {
      if (!Capacitor.isNativePlatform()) {
        google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large' }
        );
      }
    }, 0);

    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
}