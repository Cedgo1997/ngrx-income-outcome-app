import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ingresosSubs = this.store
      .select("ingresoEgreso")
      .subscribe(
        (ingresoEgreso) => (this.ingresosEgresos = ingresoEgreso.items)
      );
  }

  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string) {
    console.log(uid);
  }
}
