import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { ToastService } from 'ng-devui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  staffId: string = '';
  password: string = '';
  showPassword = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  login() {
    this.loginService
      .login(this.staffId, this.password)
      .subscribe((response) => {
        if (response.success) {
          document.cookie = `jwtToken=${response.data.token}`;
          this.router.navigateByUrl('/management');
        } else {
          this.toastService.open({
            value: [
              {
                summary: '登录失败',
                content: '账号或密码错误',
              },
            ],
          });
        }
      });
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
