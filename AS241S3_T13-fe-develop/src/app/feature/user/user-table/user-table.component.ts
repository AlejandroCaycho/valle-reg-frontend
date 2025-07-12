import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../core/interfaces/users';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  readonly BACKEND_URL = environment.urlBackEnd + '/uploads/';
  readonly DEFAULT_PHOTO = 'icons/usuario.png';

  filtroBusqueda: string = '';
  filtroRol: string = '';
  filtroEstado: string = '';
  rolesDisponibles: string[] = [];

  usuarios: User[] = [];
  usuariosFiltrados: User[] = [];
  usuariosPagina: User[] = [];

  currentPage: number = 0;
  pageSize: number = 12;

  isBrowser: boolean = false;

  usuarioSeleccionado: User | null = null;
  modalVisible: boolean = false;
  escuchandoClickAfuera = false;

  ordenCampo: string = '';
  ordenAscendente: boolean = true;

  @ViewChild('modalContainer') modalContainerRef!: ElementRef;

  constructor(
    private usersService: UsersService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAll().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.rolesDisponibles = [...new Set(this.usuarios.map(u => u.role))];
        this.filtrarUsuarios();
      },
      error: (err) => console.error(err)
    });
  }

  filtrarUsuarios() {
    const filtroTexto = this.filtroBusqueda.toLowerCase().trim();
    this.usuariosFiltrados = this.usuarios.filter((user) => {
      const coincideTexto =
        user.name.toLowerCase().includes(filtroTexto) ||
        user.documentNumber.toLowerCase().includes(filtroTexto) ||
        user.email.toLowerCase().includes(filtroTexto);

      const coincideRol = this.filtroRol ? user.role === this.filtroRol : true;
      const coincideEstado =
        this.filtroEstado === 'activo'
          ? user.state === true
          : this.filtroEstado === 'inactivo'
          ? user.state === false
          : true;

      return coincideTexto && coincideRol && coincideEstado;
    });

    this.ordenarUsuarios();
    this.currentPage = 0;
    this.actualizarUsuariosPagina();
  }

  actualizarUsuariosPagina() {
    const inicio = this.currentPage * this.pageSize;
    const fin = inicio + this.pageSize;
    this.usuariosPagina = this.usuariosFiltrados.slice(inicio, fin);
  }

  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.usuariosFiltrados.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.actualizarUsuariosPagina();
  }

  eliminarUsuario(id: number) {
    const usuario = this.usuarios.find(u => u.idUser === id);
    Swal.fire({
      title: `¿Deseas poner en inactivo a ${usuario?.name} ${usuario?.surnames}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, inactivar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.usersService.delete(id).subscribe({
          next: () => {
            this.loadUsers();
            Swal.fire('Inactivado', 'El usuario ha sido puesto en inactivo.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo inactivar al usuario.', 'error');
          }
        });
      }
    });
  }

  restaurarUsuario(id: number) {
    const usuario = this.usuarios.find(u => u.idUser === id);
    Swal.fire({
      title: `¿Deseas restaurar a ${usuario?.name} ${usuario?.surnames}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.usersService.restore(id).subscribe({
          next: () => {
            this.loadUsers();
            Swal.fire('Restaurado', 'El usuario ha sido restaurado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo restaurar al usuario.', 'error');
          }
        });
      }
    });
  }

  get bodyContraido(): boolean {
    return this.isBrowser && document.body.classList.contains('sidebar-contraido');
  }

  downloadActiveUsersReport() {
    const activos = this.usuarios.filter(u => u.state);
    if (activos.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin usuarios activos',
        text: 'No hay usuarios activos para generar el reporte.'
      });
      return;
    }

    this.usersService.downloadActiveUsersPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'usuarios_activos.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar PDF de usuarios activos', err);
        Swal.fire('Error', 'No se pudo descargar el PDF de usuarios activos.', 'error');
      }
    });
  }

  downloadInactiveUsersReport() {
    const inactivos = this.usuarios.filter(u => !u.state);
    if (inactivos.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin usuarios inactivos',
        text: 'No hay usuarios inactivos para generar el reporte.'
      });
      return;
    }

    this.usersService.downloadInactiveUsersPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'usuarios_inactivos.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar PDF de usuarios inactivos', err);
        Swal.fire('Error', 'No se pudo descargar el PDF de usuarios inactivos.', 'error');
      }
    });
  }

  abrirModalDetalles(usuario: User): void {
    this.modalVisible = true;
    this.usuarioSeleccionado = null;

    this.usersService.getById(usuario.idUser!).subscribe({
      next: (res) => {
        this.usuarioSeleccionado = res;
        setTimeout(() => {
          this.escuchandoClickAfuera = true;
        }, 0);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener los detalles del usuario.', 'error');
        this.cerrarModal();
      }
    });
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.usuarioSeleccionado = null;
    this.escuchandoClickAfuera = false;
  }

  @HostListener('document:click', ['$event'])
  cerrarModalClickAfuera(event: MouseEvent): void {
    if (!this.modalVisible || !this.escuchandoClickAfuera || !this.modalContainerRef) return;

    const clickedInside = this.modalContainerRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.cerrarModal();
    }
  }

  ordenarPor(campo: string) {
    if (this.ordenCampo === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenCampo = campo;
      this.ordenAscendente = true;
    }
    this.ordenarUsuarios();
  }

  ordenarUsuarios() {
    if (!this.ordenCampo) {
      this.actualizarUsuariosPagina();
      return;
    }

    this.usuariosFiltrados.sort((a, b) => {
      if (this.ordenCampo === 'state') {
        const valA = a.state ? 1 : 0;
        const valB = b.state ? 1 : 0;
        return this.ordenAscendente ? valA - valB : valB - valA;
      }

      const valA = ((a as any)[this.ordenCampo] ?? '').toString().toLowerCase();
      const valB = ((b as any)[this.ordenCampo] ?? '').toString().toLowerCase();

      if (valA < valB) return this.ordenAscendente ? -1 : 1;
      if (valA > valB) return this.ordenAscendente ? 1 : -1;
      return 0;
    });

    this.actualizarUsuariosPagina();
  }

  getOrdenSimbolo(campo: string): string {
    if (this.ordenCampo !== campo) return '';
    return this.ordenAscendente ? '↑' : '↓';
  }
}
