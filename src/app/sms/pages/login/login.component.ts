import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SpinnerService } from '../../../sms/services/spinner.service';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    @ViewChild('f', {static: false}) loginForm: NgForm;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private as: AppService,
                private ss: SpinnerService) {
    }

    // On submit button click
    onSubmit() {
        // @ts-ignore
        const email = document.getElementById('email_input').value;
        // @ts-ignore
        const password = document.getElementById('password_input').value;

        this.as.login({email, password}).subscribe((res) => {
            if (res) {
                console.log('logged in >> ', res);
                this.router.navigate(['dashboard/sms-dashboard'])
                    .then(r => r)
                    .catch((err) => console.error('Error >> ', err));
            }
        }, (err) => console.error('error', err));
    }

    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], {relativeTo: this.route.parent});
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], {relativeTo: this.route.parent});
    }

    ngOnInit(): void {
    }
}
