import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    private isAdmin = false

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAdmin
    }
}
