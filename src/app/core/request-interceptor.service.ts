import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import {Observable} from 'rxjs';
import {AppConsts} from "./app-consts";

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/assets/i18n')) {
            return next.handle(req)
        }
        let newReq = req.clone({
            url: AppConsts.BASE_URL + req.url,
            setHeaders: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
        })
        return next.handle(newReq);
    }
}
