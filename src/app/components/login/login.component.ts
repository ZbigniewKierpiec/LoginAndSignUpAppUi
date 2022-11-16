import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // alert(res.message);

          this.snackbar.open(`${res.message}`, undefined, {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });

          // this.snackbar.open('User loged successfuly', undefined, {
          //   duration: 3000,
          // });

          this.loginForm.reset();
          this.auth.storeToken(res.token)
          setTimeout(() => {
            this.router.navigate(['dashboard']);
          }, 1000);
        },
        error(err) {
          alert(err?.error.message);

        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }
}
