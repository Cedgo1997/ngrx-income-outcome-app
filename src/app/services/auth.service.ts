import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
    });
  }

  crearUsuario(usuario: string, correo: string, contrasena: string) {
    return this.auth.createUserWithEmailAndPassword(correo, contrasena);
  }

  login(correo: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(correo, contrasena);
  }

  logout() {
    return this.auth.signOut();
  }
}
