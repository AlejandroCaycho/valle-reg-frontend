import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mozo-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './mozo-login.component.html',
  styleUrls: ['./mozo-login.component.scss']
})
export class MozoLoginComponent {
  passwordVisible: boolean = false;

  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleIcon') toggleIcon!: ElementRef<HTMLImageElement>;

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;

    const inputEl = this.passwordInput.nativeElement;
    const iconEl = this.toggleIcon.nativeElement;

    inputEl.type = this.passwordVisible ? 'text' : 'password';
    iconEl.src = this.passwordVisible ? '/icons/visible.png' : '/icons/novisible.png';
    iconEl.alt = this.passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña';
  }

  login(): void {
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    if (username === 'mozo' && password === '1234') {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido Mozo!',
        text: 'Ingreso correcto',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        this.router.navigate(['/mesas']);
      }, 1600);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Credenciales incorrectas',
        confirmButtonColor: '#e60000'
      });
    }
  }
}
