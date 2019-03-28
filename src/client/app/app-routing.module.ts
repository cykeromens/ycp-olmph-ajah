import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DEBUG_INFO_ENABLED} from './app.constants';

const LAYOUT_ROUTES = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        ...LAYOUT_ROUTES,
        // {
        //   path: 'admin',
        //   loadChildren: './admin/admin.module#YcpolmphAdminModule'
        // },
      ],
      {useHash: true, enableTracing: DEBUG_INFO_ENABLED}
    )
  ],
  exports: [RouterModule]
})
export class YcpolmphAppRoutingModule {
}
