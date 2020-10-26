import { Injectable } from "@angular/core";

//Firestore firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
//ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as authActions from "../auth/auth.actions";
import * as ingresoEgresoActions from "./../ingreso-egreso/ingreso-egreso.actions";

//rxjs
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

//model
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  usuarioSubs: Subscription;
  private _usuario: Usuario;

  get usuario() {
    return this._usuario;
  }

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.usuarioSubs = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const usuario = Usuario.fromFirebase(firestoreUser);
            this._usuario = usuario;
            this.store.dispatch(authActions.setUser({ usuario }));
          });
      } else {
        if (this.usuarioSubs) {
          this._usuario = null;
          this.usuarioSubs.unsubscribe();
        }
        this.store.dispatch(ingresoEgresoActions.unsetItems());
        this.store.dispatch(authActions.unsetUser());
      }
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
