import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(username: string): void {
    localStorage.setItem('access', username);
  }

  public get isLogIn(): boolean {
    return (localStorage.getItem('access') !== null);
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
