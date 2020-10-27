import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { ReactiveFormsModule } from "@angular/forms";

//Modules
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

// Components
import { DetalleComponent } from "./detalle/detalle.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";

//Pipes
import { OrdenIngresosPipe } from "../pipes/orden-ingresos.pipe";
import { StoreModule } from '@ngrx/store';

//NGRX
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DetalleComponent,
    DashboardComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresosPipe,
  ],
  imports: [
    CommonModule, 
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule, 
    ChartsModule, 
    SharedModule,
    DashboardRoutesModule
  ],
})
export class IngresoEgresoModule {}
