import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      usuario: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required],
    });
  }

  crearUsuario() {
    if (this.formGroup.invalid) {
      return;
    }

    Swal.fire({
      title: "¡Cargando!",
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const { usuario, correo, contrasena } = this.formGroup.value;
    this.authService
      .crearUsuario(usuario, correo, contrasena)
      .then((credenciales) => {
        Swal.close();
        console.log(credenciales);
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  }
}
