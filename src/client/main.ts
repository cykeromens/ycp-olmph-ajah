import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {YcpOlmphModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(YcpOlmphModule)
  .catch(err => console.error(err));
