import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoEgresoForm: FormGroup;
  tipo: string = "ingreso";

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });
  }
  guardar() {
    if (this.ingresoEgresoForm.invalid) {
      return;
    }

    const { descripcion, monto } = this.ingresoEgresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        Swal.fire("¡Registro creado!", descripcion, "success");
      })
      .catch((err) => {
        Swal.fire("¡Error!", err.message, "error");
      });
  }
}
