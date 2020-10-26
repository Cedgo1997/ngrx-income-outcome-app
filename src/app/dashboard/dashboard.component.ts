import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AppState } from "../app.reducer";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.dashboardSubs = this.store
      .select("auth")
      .pipe(filter((auth) => auth.usuario != null))
      .subscribe((auth) => {
        console.log(auth.usuario);
        this.ingresoEgresoService.initIngresosEgresosListener(auth.usuario.uid);
      });
  }

  ngOnDestroy() {
    this.dashboardSubs.unsubscribe();
  }
}
