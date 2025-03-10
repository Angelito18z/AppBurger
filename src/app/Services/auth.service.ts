import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  // Importa el módulo de autenticación de Firebase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private google: GooglePlus, private AFauth: AngularFireAuth) { }

  loginWithGoogle() {
    this.google.login({})
      .then(result => {
        const user_data_google = result; // Obtienes los datos del usuario desde Google

        // Crea una credencial con el ID token de Google
        const credential = firebase.auth.GoogleAuthProvider.credential(user_data_google.idToken);

        // Inicia sesión con la credencial de Google
        this.AFauth.signInWithCredential(credential)
          .then((userCredential: firebase.auth.UserCredential) => {  // Usa el tipo correcto de UserCredential
            console.log('Firebase user signed in:', userCredential);
          })
          .catch((error: any) => {  // Especifica el tipo de error
            console.error('Error signing in with Google:', error);
          });
      })
      .catch(error => {
        console.error('Google login error:', error);
      });
  }
}
