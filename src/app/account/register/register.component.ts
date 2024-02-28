import { AuthService } from './../../core/services/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister!: FormGroup;
  hideToglePassword = true;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formRegister.valid) {
      this.authService
        .registrasi(this.formRegister.value)
        .subscribe((res: any) => {
          let testing = {
            text: 'REGISTRATION SUCCESSFULLY!',
            category: 'REGISTER',
          };
          this.dataSend.emit(testing);
          this.toogleModal();
        });
    } else {
      console.log('Form not valid');
    }
  }
  // Toogle PW
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }

  toogleModal() {
    const modal = document.querySelector('#modalSuccess');
    const background = document.querySelector('.register');
    modal?.classList.toggle('hidden');
    background?.classList.toggle('blur-sm');
    setTimeout(() => {
      modal?.classList.toggle('hidden');
      background?.classList.toggle('blur-sm');
      this.route.navigate(['/auth/login']);
    }, 3000);
  }
}
