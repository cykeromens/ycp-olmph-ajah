import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {YcpOlmphSharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HOME_ROUTE} from './home.route';

@NgModule({
  declarations: [HomeComponent],
  imports: [YcpOlmphSharedModule, RouterModule.forChild([HOME_ROUTE])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YcpOlmphHomeModule {
}
