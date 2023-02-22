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
import { HttpClientModule } from '@angular/common/http';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { EventsCardComponent } from './components/events-card/events-card.component';
import { LabTestCardComponent } from './components/lab-test-card/lab-test-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { AddUserCardComponent } from './components/add-user-card/add-user-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    PortalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
