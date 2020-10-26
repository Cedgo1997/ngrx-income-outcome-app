import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Usuario } from "src/app/models/usuario.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  usuario: string;
  correo: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select("auth").subscribe((auth) => {
      this.usuario = auth.usuario?.usuario;
      this.correo = auth.usuario?.correo;
    });
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(["/login"]));
  }
}
