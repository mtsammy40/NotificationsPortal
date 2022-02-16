import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {env} from 'process';
import User from '../models/User';
import {RequestParams} from '../models/RequestParams.model';
import Commons from '../helpers/common.utils';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getUrl(suffix: string, parameters?: Object): string {
        let url = null;
        suffix = suffix ? suffix : '';
        console.log('Url >> ', environment.api + suffix);
        url = environment.api + suffix;
        if (parameters) {
            const queryString = Commons.makeQueryString(parameters);
            url += queryString;
        }
        return url;
    }

    login(loginRequest: { email: string, password: string }): Observable<any> {
        return this.http.post(this.getUrl(environment.do_login), loginRequest)
    }

    getMessages(requestParams: RequestParams) {
        return this.http.get(this.getUrl(environment.get_messages, requestParams));
    }

    getTransactions(requestParams: RequestParams) {
        return this.http.get(this.getUrl(environment.get_transactions, requestParams));
    }

    getUsers(requestParams: RequestParams) {
        return this.http.get(this.getUrl(environment.get_users, requestParams));
    }

    getClients(requestParams: RequestParams) {
        return this.http.get(this.getUrl(environment.get_clients, requestParams));
    }

    postUser(user: User) {
        return this.http.post(this.getUrl(environment.post_user), user);
    }

    postMessage(postMessageRequest: any) {
        return this.http.post(this.getUrl(environment.post_messages), postMessageRequest);
    }

    postMessageFile(postMessageFileRequest: FormData) {
        return this.http.post(this.getUrl(environment.post_message_file), postMessageFileRequest);
    }

    getDashboard() {
        return this.http.get(this.getUrl(environment.get_dashboard));
    }
}
