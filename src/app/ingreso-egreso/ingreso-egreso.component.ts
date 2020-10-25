import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { AppState } from "../app.reducer";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import { isLoading, stopLoading } from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  ingresoEgresoSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });

    this.ingresoEgresoSubs = this.store.select("ui").subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }

  guardar() {
    if (this.ingresoEgresoForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoEgresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch(stopLoading());

        Swal.fire("¡Registro creado!", descripcion, "success");
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire("¡Error!", err.message, "error");
      });
  }
}
