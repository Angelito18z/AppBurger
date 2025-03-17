import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

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
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  ngAfterViewInit() {
    this.loadGoogleScript();
  }

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

  private initializeGIS() {
    google.accounts.id.initialize({
      client_id: '197199548223-mjhv02bg8sok044scaho6q7o7icfmp48.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    if (response.credential) {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));

      this.user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        imageUrl: payload.picture,
        familyName: payload.family_name,
        givenName: payload.given_name,
      };

      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('User saved:', this.user);

      this.cdr.detectChanges(); // Forzar la detección de cambios
    } else {
      console.error('Error during authentication:', response.error);
    }
  }

  signOut() {
    this.user = null;
    localStorage.removeItem('user');
    google.accounts.id.disableAutoSelect();
    console.log('User signed out.');

    // Esperar a que Angular actualice la vista
    setTimeout(() => {
      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
    }, 0);

    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
}