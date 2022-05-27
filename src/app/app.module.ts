import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { HeaderComponent } from './shared/header/header.component';
import { SubHeaderComponent } from './shared/sub-header/sub-header.component';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';
import { JwPaginationModule } from 'jw-angular-pagination';
import {NgHttpLoaderModule} from 'ng-http-loader';
import { PaginationDirective } from './shared/directivies/pagination.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    HeaderComponent,
    SubHeaderComponent,
    SearchFilterPipe,
    PaginationDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    JwPaginationModule,
    NgHttpLoaderModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
