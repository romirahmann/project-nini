import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;
  hideToglePassword = true;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // Toogle PW
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  onSubmit() {
    if (this.formLogin.valid) {
      // console.log('Login Success', this.formLogin.value);
      this.authService.login(this.formLogin.value).subscribe(
        (res: any) => {
          this.authService.savetoken(res.token, res.userData);
          let testing = {
            text: 'LOGIN SUCCESS!',
            category: 'LOGIN',
          };
          this.dataSend.emit(testing);
          this.toogleModal();
        },
        (error: any) => {
          console.error('Error during login:', error); // Tangani kesalahan jika terjadi
        }
      );
      // Lakukan autentikasi atau operasi lain di sini
    } else {
      console.log('Form is invalid');
    }
  }

  toogleModal() {
    const modal = document.querySelector('#modalSuccess');
    const background = document.querySelector('.login');
    modal?.classList.toggle('hidden');
    background?.classList.toggle('blur-sm');
    setTimeout(() => {
      modal?.classList.toggle('hidden');
      background?.classList.toggle('blur-sm');
      this.route.navigate(['']);
    }, 3000);
  }
}
