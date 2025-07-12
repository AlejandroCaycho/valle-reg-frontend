import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/interfaces/users';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DniService } from '../../../core/services/dni.service';
import { DniResponse } from '../../../core/interfaces/dni-response';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-popover-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './popover-users.component.html',
  styleUrls: ['./popover-users.component.scss'],
})
export class PopoverUsersComponent implements AfterViewInit, OnInit {
  readonly BACKEND_URL = environment.urlBackEnd + '/uploads/';
  readonly DEFAULT_PHOTO = '/icons/usuario.png';

  form: FormGroup;
  userToEdit: User | null = null;
  showPassword = false;
  photoPreview: string = this.DEFAULT_PHOTO;
  selectedPhoto: File | null = null;

  labelDocumento: string = 'DNI';
  dniSearchEnabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dniService: DniService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      documentType: ['DNI', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      surnames: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      adress: ['', Validators.required],
      gender: ['', Validators.required],
      state: [true, Validators.required],
    });

    this.onDocumentTypeChange();
  }

  ngOnInit(): void {
    this.form.get('documentType')?.valueChanges.subscribe(() => {
      this.onDocumentTypeChange();
    });
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.usersService.getById(+id).subscribe({
        next: (user) => this.loadUserIntoForm(user),
        error: () => {
          Swal.fire('Error', 'No se pudo cargar el usuario.', 'error');
          this.router.navigate(['/usuarios']);
        },
      });
    }
  }

  onDocumentTypeChange() {
  const selectedType = this.form.get('documentType')?.value;

  switch (selectedType) {
    case 'DNI':
      this.labelDocumento = 'DNI';
      this.dniSearchEnabled = true;
      this.form.get('documentNumber')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]);
      break;

    case 'CE':
      this.labelDocumento = 'Carné de Extranjería';
      this.dniSearchEnabled = false;
      this.form.get('documentNumber')?.setValidators([
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9]{8,12}$/), 
      ]);
      break;

    case 'PAS':
      this.labelDocumento = 'Pasaporte';
      this.dniSearchEnabled = false;
      this.form.get('documentNumber')?.setValidators([
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9]{6,12}$/), 
      ]);
      break;
  }

  this.form.get('documentNumber')?.updateValueAndValidity();
}


  loadUserIntoForm(user: User) {
    this.userToEdit = user;

    this.form.patchValue({
      documentType: user.documentType,
      documentNumber: user.documentNumber,
      name: user.name,
      surnames: user.surnames,
      email: user.email,
      password: user.password,
      role: user.role,
      phone: user.phone,
      adress: user.adress,
      gender: user.gender,
      state: user.state,
    });

    this.onDocumentTypeChange();

    this.form.get('password')?.setValidators([]);
    this.form.get('password')?.updateValueAndValidity();
    this.showPassword = false;

    this.photoPreview = user.profilePhoto
      ? `${this.BACKEND_URL}${user.profilePhoto}`
      : this.DEFAULT_PHOTO;

   
    if (!user.state) {
      this.form.disable();
      Swal.fire('Usuario inactivo', 'Este usuario no puede ser editado.', 'info');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  searchByDni() {
    const dniValue = this.form.get('documentNumber')?.value;
    const docType = this.form.get('documentType')?.value;

    if (docType !== 'DNI' || !dniValue || dniValue.length !== 8) return;

    this.dniService.buscarPorDni(dniValue).subscribe({
      next: (res: DniResponse) => {
        if (res && res.nombres && res.apellidoPaterno && res.apellidoMaterno) {
          this.form.patchValue({
            name: res.nombres.toLowerCase(),
            surnames: `${res.apellidoPaterno} ${res.apellidoMaterno}`.toLowerCase(),
          });
        } else {
          Swal.fire('No encontrado', 'El DNI no fue encontrado.', 'warning');
          this.form.patchValue({ name: '', surnames: '' });
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo consultar el DNI.', 'error');
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }

    const formValue = this.form.value;
    const userPayload: User = { ...formValue };

    if (!this.userToEdit && !this.selectedPhoto) {
      Swal.fire('Error', 'Debes seleccionar una foto de perfil.', 'error');
      return;
    }

    if (this.userToEdit) {
      Swal.fire({
        title: '¿Deseas actualizar este usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usersService.update(this.userToEdit!.idUser!, userPayload).subscribe({
            next: (res) => {
              if (this.selectedPhoto) {
                this.uploadPhoto(res.idUser!, `Usuario ${res.name} actualizado.`);
              } else {
                Swal.fire('Éxito', `Usuario ${res.name} actualizado.`, 'success');
                this.router.navigate(['/usuarios']);
              }
            },
            error: () => {
              Swal.fire('Error', 'Error al actualizar.', 'error');
            },
          });
        }
      });
    } else {
      Swal.fire({
        title: '¿Deseas registrar este usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usersService.create(userPayload).subscribe({
            next: (res) => {
              if (this.selectedPhoto) {
                this.uploadPhoto(res.idUser!, `Usuario ${res.name} creado.`);
              } else {
                Swal.fire('Éxito', `Usuario ${res.name} creado.`, 'success');
                this.router.navigate(['/usuarios']);
              }
            },
            error: () => {
              Swal.fire('Error', 'Datos duplicados. Verifica la información.', 'error');
            },
          });
        }
      });
    }
  }

  uploadPhoto(id: number, successMessage?: string) {
    if (!this.selectedPhoto) return;

    this.usersService.uploadProfilePhoto(id, this.selectedPhoto).subscribe({
      next: () => {
        Swal.fire('Éxito', successMessage || 'Foto subida correctamente.', 'success');
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        Swal.fire('Advertencia', 'Usuario creado, pero la foto no se subió.', 'warning');
        this.router.navigate(['/usuarios']);
      },
    });
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/usuarios']);
  }

  get maxLengthDocumento(): number {
    const tipo = this.form.get('documentType')?.value;
    switch (tipo) {
      case 'DNI':
        return 8;
      case 'CE':
        return 12;
      case 'PAS':
        return 12;
      default:
        return 12;
    }
  }
}
