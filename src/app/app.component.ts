import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    envConfig: any;
    configLoaded: boolean;

    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));

            this.http.get<any>('assets/config.json').subscribe(res => {
                this.envConfig = res;
                this.configLoaded = true;
                Object.keys(this.envConfig).forEach(k => {
                    environment[k] = this.envConfig[k];
                });
            }, err => {
                this.configLoaded = true
            });
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}