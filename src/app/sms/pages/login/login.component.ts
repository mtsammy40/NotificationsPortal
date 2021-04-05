import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiResponse, ApiResponseCodes } from 'app/sms/models/ApiResponse';
import { SpinnerService } from '../../../sms/services/spinner.service';
import { AppService } from '../../services/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    @ViewChild('f', { static: false }) loginForm: NgForm;

    loginLoaderKey: string = 'Login';

    constructor(private router: Router,
        private route: ActivatedRoute,
        private as: AppService,
        private auth: AuthService,
        private ss: SpinnerService) {
    }

    // On submit button click
    onSubmit() {
        // @ts-ignore
        const email = document.getElementById('email_input').value;
        // @ts-ignore
        const password = document.getElementById('password_input').value;
        this.ss.ngxLoader.startLoader(this.loginLoaderKey);
        this.as.login({ email, password }).subscribe((res: ApiResponse) => {
            this.ss.ngxLoader.stopLoader(this.loginLoaderKey)
            if (ApiResponse.isSuccess(res)) {
                console.log('logged in >> ', res);
                this.auth.saveUserInfo(res.data);
                this.router.navigate(['dashboard/sms-dashboard'])
                    .then(r => r)
                    .catch((err) => console.error('Error >> ', err));
            }
        }, (err: HttpErrorResponse) => {
            this.ss.ngxLoader.stopLoader(this.loginLoaderKey);
            let errorMessage: string = err.error && err.error.message ? err.error.message : 'We could not log you in. Please try again later';
            console.error('error', err);
        });
    }

    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    ngOnInit(): void {
    }
}
