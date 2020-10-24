import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
    });
  }

  crearUsuario(usuario: string, correo: string, contrasena: string) {
    return this.auth
      .createUserWithEmailAndPassword(correo, contrasena)
      .then((fuser) => {
        const nuevoUsuario = new Usuario(fuser.user.uid, usuario, correo);
        return this.firestore
          .doc(`${fuser.user.uid}/usuario`)
          .set({ ...nuevoUsuario });
      });
  }

  login(correo: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(correo, contrasena);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
