import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modulos
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Angular Fire and Firestore
import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFirestoreModule } from "@angular/fire/firestore";

// NGRX
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./app.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/ingreso-egreso.component";
import { EstadisticaComponent } from "./ingreso-egreso/estadistica/estadistica.component";
import { DetalleComponent } from "./ingreso-egreso/detalle/detalle.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DetalleComponent,
    RegisterComponent,
    DashboardComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    StoreModule.forRoot(appReducers),
    AngularFireModule.initializeApp(environment.firebase),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
