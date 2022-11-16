import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSingup() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          // alert(res.message);

          this.snackbar.open(`${res.message}`, undefined, {
            duration: 4000,
            panelClass:['green-snackbar']
          });

          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          // alert(err.error.message);

          this.snackbar.open(`${err.error.message}`, undefined, {
            duration: 4000,
            panelClass:['red-snackbar']
          });
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
