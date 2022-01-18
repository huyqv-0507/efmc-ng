import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';

import {UsersService} from "../../service/users/users.service";
import {error} from "protractor";
import {Router} from "@angular/router";
import {LoginResultModel} from "../../service/users/login-result.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    public userName: string | undefined;
    public password: string | undefined;

    public isLoginSuccess: boolean | undefined;
    public isLoginMessage: string;

    constructor(
        private messageService: MessageService,
        private userService: UsersService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    async login() {
        this.userService.login(this.userName, this.password).subscribe(
            {
                next: value => {
                    this.isLoginSuccess = value.success;
                    this.isLoginMessage = value.message;
                    this.messageService.add({
                        key: 'loginNotify',
                        severity: 'success',
                        summary: 'Thông báo',
                        detail: this.isLoginMessage
                    });
                    this.router.navigate(['']);
                },
                error: (error: LoginResultModel) => {
                    this.isLoginSuccess = error.success;
                    this.isLoginMessage = error.message;
                    this.messageService.add({
                        key: 'loginNotify',
                        severity: 'error',
                        summary: 'Lỗi đăng nhập',
                        detail: this.isLoginMessage
                    });
                }
            });
    }

}
