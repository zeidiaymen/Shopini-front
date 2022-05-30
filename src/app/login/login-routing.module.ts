import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { EmailFormComponent } from './forgetPassword/email-form/email-form.component';
import { PasswordFormComponent } from './forgetPassword/password-form/password-form.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

const routes: Routes = [


  {path:'forgetPasswordEmailForm',component:EmailFormComponent},
  {path:'forgetPasswordPasswordForm/:id',component:PasswordFormComponent},
  {path:'activateAccount/:id',component:ActivateAccountComponent},
  {path:'twoFactorAuthentication/:id',component:TwoFactorAuthenticationComponent},

  {path:'**',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
