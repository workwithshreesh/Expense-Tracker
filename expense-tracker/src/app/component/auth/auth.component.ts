import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  FormsData!: FormGroup;
  isRegistering: boolean = false; 
  errorMessage: string = ''; // To store error messages
  allUser: any;

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

    this.initForm()
  }

  initForm(): void {
    this.FormsData = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['' ,[Validators.required, Validators.email]],
      fullName: [ '' , [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.FormsData.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }
  
    const formData = this.FormsData.value; 
    this.errorMessage = ''; 
  
    this.authService.getAllUser().subscribe(data => {
      console.log("Fetched Users:", data);
      
      this.allUser = data.user;

  
      const isExistUser = this.allUser.filter(
        (user: any) => user.username?.toLowerCase().trim() === formData.username?.toLowerCase().trim()
      );

      const isExistEmail = this.allUser.filter(
        (user: any) => user.email?.toLowerCase().trim() === formData.email?.toLowerCase().trim()
      );

  
      console.log("Matching Users:", isExistUser, isExistEmail);
  
      if (isExistUser.length > 0) {
        alert("Username already exists. Please choose another.");
        return;
      }

      if(isExistEmail.length > 0){
        alert("Email already exists. Please choose another.");
        return;
      }
  
      this.authService.registerNewUser(formData).subscribe(data=>{
      });
      alert("User is created");
      this.router.navigateByUrl("/login");
    });
  }
  

}

// this.authService.login(data).subscribe({
//   next: (response) => {
//     sessionStorage.setItem('jwtToken', response.token);
//     this.router.navigate(['/']);
//   },
//   error: (err) => {
//     this.errorMessage = err.error?.message || 'Invalid username or password.';
//   }
// });
