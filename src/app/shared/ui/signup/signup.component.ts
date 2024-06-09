import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdduserDirective } from '../../directives/adduser.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, AdduserDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export default class SignupComponent {
  readonly singupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\u10A0-\u10FF\s]{2,50}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/),
    ]),
  });

  onSubmit() {
    const { name, email, password } = this.singupForm.value;

    if (!name || !email || !password) {
      return;
    }

    this.singupForm.reset();
  }
}
