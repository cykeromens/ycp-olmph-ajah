import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../core/auth/account.service';
import {Principal} from '../../core/auth/principal.service';
import {IUser} from '../../core/user/user.model';


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
      login: account.login,
      imageUrl: account.imageUrl,
      bioData: account.bioData ? account.bioData : {}
    };
  }
}
