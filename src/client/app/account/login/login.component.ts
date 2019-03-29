import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer} from '@angular/core';
import {LoginService} from '../../core/login/login.service';
import {StateStorageService} from '../../core/auth/state-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  email: string;
  credential: any;

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  login() {
    this.loginService
      .login({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {
        this.authenticationError = false;
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        // this.eventManager.broadcast({
        //   name: 'authenticationSuccess',
        //   content: 'Sending Authentication Success'
        // });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is succesful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigate([redirect]);
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    this.router.navigate(['/reset', 'request']);
  }
}
