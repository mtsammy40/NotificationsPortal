import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "app/shared/auth/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService ){}

   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');
    // We retrieve the token, if any
    const token = this.auth.getToken();
    let newHeaders = req.headers;
    if (token) {
       // If we have a token, we append it to our new headers
       newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({headers: newHeaders});
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
   }
}