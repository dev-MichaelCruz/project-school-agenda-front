import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Role } from '../types/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://schoolagenda.duckdns.org/api';

  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  isLoggedIn = this._isLoggedIn.asReadonly();

  private _role = signal<Role | null>(
    localStorage.getItem('role') as Role | null
  );
  role = this._role.asReadonly();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, {
      email,
      password
    }).pipe(
      tap((res) => {

        const token = res.token || res.accessToken || res.access_token;

        const role: Role =
          res.role ||
          res.user?.role;

        if (!token || !role) {
          throw new Error('Resposta de login inválida');
        }

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        this._isLoggedIn.set(true);
        this._role.set(role);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this._isLoggedIn.set(false);
    this._role.set(null);
  }

}
