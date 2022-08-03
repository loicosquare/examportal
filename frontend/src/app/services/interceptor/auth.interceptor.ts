import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService : LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
        //Add the jwt token (localStorate) request
        let authReq = req;
        const token = this.loginService.getToken();
        console.log("Inside interceptor");

        if (token != null) {
            authReq = authReq.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
        }

        return next.handle(authReq);
    }

}

export const authInterceptorProviders = [ /*A importer dans APP module comme provider*/
    {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
]