import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule, MatProgressSpinnerModule, MatMenuModule } from '@angular/material';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { LoadingSpinnerInterceptorService } from './interceptors/loading-spinner-interceptor.service';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { NestedCategoriesMenuComponent } from './components/nested-categories-menu/nested-categories-menu.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    LoadingSpinnerComponent,
    NotificationListComponent,
    NotFoundComponent,
    AdminMenuComponent,
    NestedCategoriesMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
