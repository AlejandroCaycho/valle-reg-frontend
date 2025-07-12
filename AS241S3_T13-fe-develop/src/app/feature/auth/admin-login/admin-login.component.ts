import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  passwordVisible: boolean = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleIcon') toggleIcon!: ElementRef<HTMLImageElement>;
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

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

    if (username === 'admin' && password === 'admin123') {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        this.router.navigate(['/usuarios']);
      }, 1600);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Por favor verifica tu usuario y contraseña',
        confirmButtonColor: '#e60000'
      });
    }
  }
}
