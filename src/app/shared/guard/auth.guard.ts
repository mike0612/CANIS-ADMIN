import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    Router
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AngularFireAuth,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.authState.pipe(map(auth => {
            if (isNullOrUndefined(auth)) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}
