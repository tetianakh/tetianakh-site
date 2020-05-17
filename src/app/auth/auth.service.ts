import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: Observable<any>;

  constructor(private auth: AngularFireAuth) {
    this.user = this.auth.user;
  }

  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            throw new Error('Email or password are incorrect.');
          default:
            throw new Error('An error has occured.');
        }
      });
  }
  logout() {
    this.auth.signOut();
  }
}
