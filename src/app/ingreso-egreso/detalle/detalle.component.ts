import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit {
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select("ingresoEgreso")
      .subscribe(
        (ingresoEgreso) => (this.ingresosEgresos = ingresoEgreso.items)
      );
  }
}
