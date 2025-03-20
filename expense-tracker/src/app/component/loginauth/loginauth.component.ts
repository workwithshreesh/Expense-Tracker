import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginauth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './loginauth.component.html',
  styleUrl: './loginauth.component.css'
})
export class LoginauthComponent {
  FormsData!: FormGroup;
  isRegistering: boolean = false; 
  errorMessage: string = ''; // To store error messages

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect authenticated users to home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Determine if the current route is "register" or "login"
   this.initForm()
  }

  initForm(): void {
    this.FormsData = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.FormsData.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const data = this.FormsData.value;
    this.errorMessage = ''; 

      this.authService.login(data).subscribe({
       next: (response) => {
         sessionStorage.setItem('jwtToken', response.token);
         this.router.navigate(['/']);
       },
       error: (err) => {
         this.errorMessage = err.error?.message || 'Invalid username or password.';
       }
     });
   
}

}
