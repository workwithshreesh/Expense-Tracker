import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth/';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwtToken');
    }

    let decodedToken = null;
    if (token) {
      try {
        decodedToken = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token detected:", error);
      }
    }

    this.currentUserSubject = new BehaviorSubject<any>(decodedToken);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  registerNewUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register', data);
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'jwtToken' && !event.newValue) {
      this.logout();
    }
  }


  login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', data).pipe(
      tap(response => {
        const token = response.token || response.message; 
        const userId = response.userId
        console.log(response)
        if (token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', userId);
          }
          this.currentUserSubject.next(jwtDecode(token));
          this.router.navigate(['/']);
        } else {
          console.error("No valid token received in login response");
        }
      })
    );
  }
  
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    const token = localStorage.getItem('jwtToken');
    return token ? !this.isTokenExpired(token) : false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return true; // Treat as expired if decoding fails
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('jwtToken');
  }

  getAllUser():Observable<any>{
    return this.http.get<any>(this.baseUrl+"users")
  }
}
