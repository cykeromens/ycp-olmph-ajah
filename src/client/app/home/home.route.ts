import {Route} from '@angular/router';

import {HomeComponent} from './home.component';
import {MainComponent} from '../layouts/main/main.component';
import {UserRouteAccessService} from '../core/auth/user-route-access-service';

export const HOME_ROUTE: Route = {
  path: '',
  component: MainComponent,
  children: [
    {
      path: '', component: HomeComponent,
      data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Welcome, YCP OLMPH, Ajah!'
      },
      canActivate: [UserRouteAccessService]
    }
  ]
};
