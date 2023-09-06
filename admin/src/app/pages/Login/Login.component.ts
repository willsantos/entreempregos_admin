import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso!', response);
      },
      error: (error) => {
        console.log('Falha no login!', error);
      },
    });
  }
}
