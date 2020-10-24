import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required],
    });
  }

  login() {
    if (this.formGroup.invalid) {
      return;
    }

    const { correo, contrasena } = this.formGroup.value;
    this.authService
      .login(correo, contrasena)
      .then((credenciales) => {
        console.log(credenciales);
        
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
