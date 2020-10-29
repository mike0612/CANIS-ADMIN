import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private AFauth: AngularFireAuth) { }

    logIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
                resolve(user);
            }).catch(error => reject(error));
        });
    }

    registro(email: string, password: string) {
        return this.AFauth.auth.createUserWithEmailAndPassword(email, password);
    }

    changePass(password: string) {
        return this.AFauth.auth.currentUser.updatePassword(password);
    }

    updateEmail(mail: string) {
        return this.AFauth.auth.currentUser.updateEmail(mail);
    }

    logOut() {
        return this.AFauth.auth.signOut();
    }

    deleteAccount() {
        return this.AFauth.auth.currentUser.delete();
    }

    recuperar(email: string) {
        return this.AFauth.auth.sendPasswordResetEmail(email);
    }

}
