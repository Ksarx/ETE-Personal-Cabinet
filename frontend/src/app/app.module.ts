import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { IncidentCardComponent } from './components/incidents-card/incidents-card.component';
import { UserComponent } from './components/user/user.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { EventsCardComponent } from './components/events-card/events-card.component';
import { LabTestCardComponent } from './components/lab-test-card/lab-test-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { AddUserCardComponent } from './components/add-user-card/add-user-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    IncidentCardComponent,
    UserComponent,
    UserPageComponent,
    HomePageComponent,
    KpiCardComponent,
    EventsCardComponent,
    LabTestCardComponent,
    AddCardComponent,
    AddUserCardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    PortalModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
