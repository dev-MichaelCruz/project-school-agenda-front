import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://schoolagenda.duckdns.org/api';

  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  isLoggedIn = this._isLoggedIn.asReadonly();

  private _role = signal<string | null>(localStorage.getItem('role'));
  role = this._role.asReadonly();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, {
      email,
      password
    }).pipe(
      tap((res) => {
        /**
         * ⚠️ Aqui depende do backend
         * Ajuste conforme o retorno real
         */
        const token = res.token || res.accessToken;
        const role = res.role;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        this._isLoggedIn.set(true);
        this._role.set(role);
      })
    );
  }

  logout() {
    localStorage.clear();
    this._isLoggedIn.set(false);
    this._role.set(null);
  }

}
