import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <nav class="nav container">
        <div class="nav-brand">
          <i class="fas fa-heart"></i>
          <span>SKOWY</span>
        </div>
        
        <div class="nav-menu" [class.active]="isMenuOpen">
          <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
          </a>
          <a routerLink="/fotos" class="nav-link" routerLinkActive="active">
            <i class="fas fa-camera"></i>
            <span>Fotos</span>
          </a>
          <a routerLink="/dibujos" class="nav-link" routerLinkActive="active">
            <i class="fas fa-palette"></i>
            <span>Dibujos</span>
          </a>
          <a routerLink="/canciones" class="nav-link" routerLinkActive="active">
            <i class="fas fa-music"></i>
            <span>Canciones</span>
          </a>
          <a routerLink="/halloween" class="nav-link" routerLinkActive="active">
            <i class="fas fa-ghost"></i>
            <span>Halloween</span>
          </a>
        </div>
        
        <button class="nav-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: var(--transition);
    }

    .header.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 4.5rem;
      font-weight: 600;
      color:rgb(114, 39, 226);
      font-family: 'Dancing Script', cursive;
    }

    .nav-brand i {
      font-size: 3.8rem;
      animation: heartbeat 2s ease-in-out infinite;
    }

    .nav-menu {
      display: flex;
      gap: 3rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.2rem;
      text-decoration: none;
      color: var(--text-dark);
      border-radius: 50px;
      transition: var(--transition);
      font-weight: 500;
    }

    .nav-link:hover {
      background: linear-gradient(25deg, #667eea, #764ba2);
      color: white;
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: linear-gradient(25deg, #667eea, #764ba2);
      color: white;
    }

    .nav-link i {
      font-size: 1.1rem;
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .nav-toggle span {
      width: 100%;
      height: 3px;
      background: var(--primary-color);
      margin: 3px 0;
      transition: var(--transition);
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
      }

      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-toggle {
        display: flex;
      }

      .nav-link {
        justify-content: center;
        padding: 1rem;
        font-size: 1.1rem;
      }
    }
  `]
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}