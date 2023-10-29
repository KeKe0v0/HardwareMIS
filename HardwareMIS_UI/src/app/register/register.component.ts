import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './service/register.service';
import { ToastService } from 'ng-devui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  showPassword2th = false;
  password: string = '';
  password2th: string = '';
  name: string = '';
  sex: any = '男';
  birthday: any = null;
  telephone: string = '';
  email: string = '';
  departmentId: any = null;

  options = ['销售组', '库存管理组', '采购组', '物流组'];
  sexChose = ['男', '女'];

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  back() {
    this.router.navigateByUrl('/login');
  }

  submit() {
    this.sex = this.sex === '男' ? 1 : 2;
    this.departmentId = '0' + (this.options.indexOf(this.departmentId) + 1);
    this.registerService
      .register(
        this.password,
        this.name,
        this.sex,
        this.birthday,
        this.telephone,
        this.email,
        this.departmentId
      )
      .subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/login');
          this.toastService.open({
            value: [
              {
                summary: '注册成功',
                content: '请等待管理员审核',
              },
            ],
          });
        } else {
          this.toastService.open({
            value: [
              {
                content: '注册失败',
              },
            ],
          });
        }
      });
  }
}
