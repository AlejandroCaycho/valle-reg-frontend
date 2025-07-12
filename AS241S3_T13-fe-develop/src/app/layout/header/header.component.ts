import { Component, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mostrarSoporte: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  @Output() toggleSidebar = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideHeader = this.elementRef.nativeElement.contains(target);
    const clickedInsideSoporte = target.closest('.soporte-box');

    if (!clickedInsideHeader && !clickedInsideSoporte && this.mostrarSoporte) {
      this.mostrarSoporte = false;
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout(): void {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e60000',
      cancelButtonColor: '#999',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1300);
      }
    });
  }
}
