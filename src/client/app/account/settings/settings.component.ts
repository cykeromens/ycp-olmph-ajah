import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../core/auth/account.service';
import {Principal} from '../../core/auth/principal.service';
import {IUser} from '../../core/user/user.model';

declare let $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  error: string;
  success: string;
  settingsAccount: IUser;
  languages: any[];
  dateOfBirthDp: any;

  constructor(private account: AccountService, private principal: Principal) {
  }

  ngOnInit() {
    this.principal.identity().then(account => {
      this.settingsAccount = this.copyAccount(account);
    });
    this.wizardForm();
  }

  save() {
    this.account.save(this.settingsAccount).subscribe(
      () => {
        this.error = null;
        this.success = 'OK';
        this.principal.identity(true).then(account => {
          this.settingsAccount = this.copyAccount(account);
        });
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  copyAccount(account) {
    return {
      activated: account.activated,
      email: account.email,
      firstName: account.firstName,
      langKey: account.langKey,
      lastName: account.lastName,
      username: account.username,
      imageUrl: account.imageUrl,
      bioData: account.bioData ? account.bioData : {}
    };
  }
  wizardForm() {
    $('#wizard').steps();
    $('#form').steps({
      bodyTag: 'fieldset',
      onStepChanging: function (event, currentIndex, newIndex) {
        // Always allow going backward even if the current step contains invalid fields!
        if (currentIndex > newIndex) {
          return true;
        }

        // Forbid suppressing 'Warning' step if the user is to young
        if (newIndex === 3 && Number($('#age').val()) < 18) {
          return false;
        }

        const form = $(this);

        // Clean up if user went backward before
        if (currentIndex < newIndex) {
          // To remove error styles
          $('.body:eq(' + newIndex + ') label.error', form).remove();
          $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
        }

        // Disable validation on fields that are disabled or hidden.
        form.validate().settings.ignore = ':disabled,:hidden';

        // Start validation; Prevent going forward if false
        return form.valid();
      },
      onStepChanged: function (event, currentIndex, priorIndex) {
        // Suppress (skip) 'Warning' step if the user is old enough.
        if (currentIndex === 2 && Number($('#age').val()) >= 18) {
          $(this).steps('next');
        }

        // Suppress (skip) 'Warning' step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3) {
          $(this).steps('previous');
        }
      },
      onFinishing: function (event, currentIndex) {
        const form = $(this);

        // Disable validation on fields that are disabled.
        // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
        form.validate().settings.ignore = ':disabled';

        // Start validation; Prevent form submission if false
        return form.valid();
      },
      onFinished: function (event, currentIndex) {
        const form = $(this);

        // Submit form input
        form.submit();
      }
    }).validate({
      errorPlacement: function (error, element) {
        element.before(error);
      },
      rules: {
        confirm: {
          equalTo: '#password'
        }
      }
    });
  }
}
