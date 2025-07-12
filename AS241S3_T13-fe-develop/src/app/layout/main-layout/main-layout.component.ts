import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  @ViewChild('sidebar') sidebar!: SidebarComponent;

  sidebarContraido = false;

  toggleSidebar() {
    this.sidebar.toggle();
    this.sidebarContraido = this.sidebar.contraido;

    const body = document.body;
    if (this.sidebarContraido) {
      body.classList.add('sidebar-contraido');
    } else {
      body.classList.remove('sidebar-contraido');
    }
  }
}
