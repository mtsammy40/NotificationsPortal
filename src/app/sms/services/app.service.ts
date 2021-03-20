import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getUrl(suffix: string) {
        suffix = suffix ? suffix : '';
        console.log('Url >> ', environment.api + suffix);
        return environment.api + suffix;
    }

    login(loginRequest: { email: string, password: string }): Observable<any> {
        return this.http.post(this.getUrl(environment.do_login), loginRequest)
    }

    getMessages() {
        return this.http.get(this.getUrl(environment.get_messages));
    }

    getTransactions() {
        return this.http.get(this.getUrl(environment.get_transactions));
    }

    postMessage(postMessageRequest: any) {
        return this.http.post(this.getUrl(environment.post_messages), postMessageRequest);
    }

    postMessageFile(postMessageFileRequest: FormData) {
        return this.http.post(this.getUrl(environment.post_message_file), postMessageFileRequest);
    }
}
