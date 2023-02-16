import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { CardComponent } from './components/content/components/card/card.component';
import { CardsListComponent } from './components/content/components/cards-list/cards-list.component';
import { AnalyticCardComponent } from './components/content/components/analytic-card/analytic-card.component';
import { AnalyticCardListComponent } from './components/content/components/analytic-card-list/analytic-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    CardComponent,
    CardsListComponent,
    AnalyticCardComponent,
    AnalyticCardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
