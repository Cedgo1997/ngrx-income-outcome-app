import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth.service";
import { isLoading, stopLoading } from "src/app/shared/ui.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  cargando: boolean = false;
  uiSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required],
    });

    this.uiSubs = this.store.select("ui").subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log("cargando subs en login");
    });
  }

  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  login() {
    if (this.formGroup.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    /* Swal.fire({
      title: "¡Cargando!",
      willOpen: () => {
        Swal.showLoading();
      },
    }); */

    const { correo, contrasena } = this.formGroup.value;
    this.authService
      .login(correo, contrasena)
      .then((credenciales) => {
        console.log(credenciales);
        /* Swal.close(); */
        this.store.dispatch(stopLoading());
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        /* Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        }); */
      });
  }
}
