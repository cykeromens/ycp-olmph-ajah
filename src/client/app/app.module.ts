import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {MainComponent} from './layouts/main/main.component';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {SideBarComponent} from './layouts/side-bar/side-bar.component';

import {YcpOlmphSharedModule} from './shared/shared.module';
import {YcpOlmphCoreModule} from './core/core.module';
import {YcpOlmphHomeModule} from './home/home.module';
import {YcpolmphAccountModule} from './account/account.module';
import {YcpolmphAppRoutingModule} from './app-routing.module';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {LocalStorageService, NgxWebstorageModule, SessionStorageService} from 'ngx-webstorage';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {AppComponent} from './app.component';

// import {JhiEventManager} from 'ng-jhipster';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    BlankComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({prefix: 'app', separator: '-'}),
    YcpOlmphCoreModule,
    YcpOlmphSharedModule,
    YcpOlmphHomeModule,
    YcpolmphAccountModule,
    YcpolmphAppRoutingModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      // deps: [JhiEventManager]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class YcpOlmphModule {
}
