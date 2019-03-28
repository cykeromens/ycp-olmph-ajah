import {Route} from '@angular/router';

import {ActivateComponent} from './activate.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';

export const activateRoute: Route = {
  path: 'activate',
  component: ActivateComponent,
  data: {
    authorities: [],
    pageTitle: 'Activation'
  },
  canActivate: [UserRouteAccessService]
};
