import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginService implements CanActivate {
    constructor(private router: Router) { }
    
    private userIsAuthenticated: boolean;

    canActivate() {
        if (!localStorage.getItem('user')) {
            alert('Activation blocked');
            this.router.navigate(['./home']);
            return false;
        }

        return true;
    }
}

