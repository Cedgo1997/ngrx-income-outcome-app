import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRouteSnapshot } from "@angular/router";
import "firebase/firestore";
import { map } from "rxjs/operators";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore
      .doc(`${this.authService.usuario.uid}/ingresos-egresos`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snap) => {
          return snap.map((doc) => {
            const data: {} = doc.payload.doc.data();
            return {
              uid: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
  }
}
