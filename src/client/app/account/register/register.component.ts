import {AfterViewInit, Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {Register} from './register.service';
import {Router} from '@angular/router';
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from '../../shared/constants/error.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  confirmPassword: string;
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  registerAccount: any;
  success: boolean;
  modalRef: NgbModalRef;

  constructor(
    private registerService: Register,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.success = false;
    this.registerAccount = {};
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
  }

  register() {
    if (this.registerAccount.password !== this.confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.registerAccount.langKey = 'en';
      this.registerService.save(this.registerAccount).subscribe(
        () => {
          this.success = true;
        },
        response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }
}
