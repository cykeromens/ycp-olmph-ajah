import {NgModule} from '@angular/core';
import {SharedLibsModule} from './shared-libs.module';
// import {YcpAlertComponent} from './alert/alert.component';
// import {YcpAlertErrorComponent} from './alert/alert-error.component';

@NgModule({
  imports: [
    SharedLibsModule,
  ],
  // declarations: [YcpAlertComponent, YcpAlertErrorComponent],
  exports: [SharedLibsModule],

})
export class YcpOlmphSharedModule {
}
