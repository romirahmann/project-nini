import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // Add a property to track the sidebar state
  isSidebarOpen = false;
  userLogin!: any;
  constructor(private el: ElementRef, private authApi: AuthService) {}
  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authApi.getUserLogin();
  }

  toggleSubMenuThreshold() {
    const submenu = document.querySelector('#submenu-threshold');
    submenu?.classList.toggle('hidden');
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if the click is outside the sidebar
    if (
      this.isSidebarOpen &&
      !this.el.nativeElement
        .querySelector('#sidebar-multi-level-sidebar')
        .contains(event.target as Node) &&
      !this.el.nativeElement
        .querySelector('[data-drawer-target="sidebar-multi-level-sidebar"]')
        .contains(event.target as Node)
    ) {
      this.isSidebarOpen = false;
    }
  }

  logout() {
    this.authApi.logout();
  }
}
