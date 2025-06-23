import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drawings-page">
      <div class="page-header">
        <div class="container">
          <h1><i class="fas fa-palette"></i> Nuestros Dibujos</h1>
          <p>Arte creado con amor para expresar lo que las palabras no pueden</p>
        </div>
      </div>

      <div class="drawings-content container">
        <div class="drawings-intro">
          <div class="intro-text">
            <h2>Expresando Amor a Través del Arte</h2>
            <p>
              Cada trazo cuenta una historia, cada color expresa un sentimiento. 
              Aquí están nuestras creaciones artísticas que nacen del corazón y 
              representan los momentos más especiales de nuestra relación.
            </p>
          </div>
        </div>

        <div class="drawings-gallery">
          <div *ngFor="let drawing of drawings; let i = index" 
               class="drawing-card"
               (click)="openModal(drawing, i)">
            <div class="drawing-image">
              <img [src]="drawing.url" [alt]="drawing.title" loading="lazy">
              <div class="drawing-overlay">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>
            <div class="drawing-info">
              <h3>{{ drawing.title }}</h3>
              <p class="drawing-date">{{ drawing.date }}</p>
              <p class="drawing-medium">{{ drawing.medium }}</p>
              <p class="drawing-description">{{ drawing.description }}</p>
            </div>
          </div>
        </div>

        <div class="art-stats">
          <div class="stat-card">
            <div class="stat-number">{{ drawings.length }}</div>
            <div class="stat-label">Obras Creadas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getUniqueMedia().length }}</div>
            <div class="stat-label">Técnicas Usadas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">∞</div>
            <div class="stat-label">Amor Expresado</div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal" [class.active]="modalActive" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-image">
            <img [src]="selectedDrawing?.url" [alt]="selectedDrawing?.title" *ngIf="selectedDrawing">
          </div>
          <div class="modal-info" *ngIf="selectedDrawing">
            <h3>{{ selectedDrawing.title }}</h3>
            <div class="modal-meta">
              <span class="modal-date">{{ selectedDrawing.date }}</span>
              <span class="modal-medium">{{ selectedDrawing.medium }}</span>
            </div>
            <p class="modal-description">{{ selectedDrawing.description }}</p>
            <div class="modal-inspiration" *ngIf="selectedDrawing.inspiration">
              <h4>Inspiración:</h4>
              <p>{{ selectedDrawing.inspiration }}</p>
            </div>
          </div>
          <div class="modal-nav">
            <button (click)="previousDrawing()" class="nav-btn prev">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button (click)="nextDrawing()" class="nav-btn next">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .drawings-page {
      padding-top: 80px;
      min-height: 100vh;
      background: var(--background-light);
    }

    .page-header {
      background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-family: 'Dancing Script', cursive;
    }

    .page-header i {
      margin-right: 1rem;
      color: #FFD93D;
    }

    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .drawings-content {
      padding: 4rem 0;
    }

    .drawings-intro {
      text-align: center;
      margin-bottom: 4rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .intro-text h2 {
      font-size: 2.5rem;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      font-family: 'Dancing Script', cursive;
    }

    .intro-text p {
      font-size: 1.1rem;
      color: var(--text-light);
      line-height: 1.7;
    }

    .drawings-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .drawing-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: var(--transition);
      cursor: pointer;
    }

    .drawing-card:hover {
      transform: translateY(-10px);
      box-shadow: var(--shadow-hover);
    }

    .drawing-image {
      position: relative;
      height: 300px;
      overflow: hidden;
    }

    .drawing-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .drawing-card:hover .drawing-image img {
      transform: scale(1.1);
    }

    .drawing-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);
    }

    .drawing-card:hover .drawing-overlay {
      opacity: 1;
    }

    .drawing-overlay i {
      color: white;
      font-size: 2rem;
    }

    .drawing-info {
      padding: 2rem;
    }

    .drawing-info h3 {
      font-size: 1.5rem;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .drawing-date {
      color: var(--primary-color);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .drawing-medium {
      color: var(--secondary-color);
      font-style: italic;
      margin-bottom: 1rem;
    }

    .drawing-description {
      color: var(--text-light);
      line-height: 1.6;
    }

    .art-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: var(--border-radius);
      text-align: center;
      box-shadow: var(--shadow);
      transition: var(--transition);
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-light);
      font-weight: 500;
    }

    /* Modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: var(--transition);
      padding: 2rem;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      background: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
      transition: var(--transition);
    }

    .modal-close:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.1);
    }

    .modal-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
    }

    .modal-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .modal-info {
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .modal-info h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }

    .modal-meta {
      display: flex;
      gap: 2rem;
      margin-bottom: 1.5rem;
    }

    .modal-date {
      color: var(--primary-color);
      font-weight: 500;
    }

    .modal-medium {
      color: var(--secondary-color);
      font-style: italic;
    }

    .modal-description {
      color: var(--text-light);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .modal-inspiration h4 {
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .modal-inspiration p {
      color: var(--text-light);
      line-height: 1.6;
      font-style: italic;
    }

    .modal-nav {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      pointer-events: none;
    }

    .nav-btn {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      transition: var(--transition);
      pointer-events: all;
    }

    .nav-btn:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.1);
    }

    @media (max-width: 968px) {
      .modal-content {
        grid-template-columns: 1fr;
        max-width: 95vw;
        max-height: 95vh;
      }

      .modal-info {
        padding: 2rem;
      }

      .drawings-gallery {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 2.5rem;
      }

      .intro-text h2 {
        font-size: 2rem;
      }

      .drawings-gallery {
        grid-template-columns: 1fr;
      }

      .art-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DrawingsComponent {
  modalActive = false;
  selectedDrawing: any = null;
  currentIndex = 0;

  drawings = [
    {
      id: 1,
      title: 'Retrato de Nosotros',
      date: 'Marzo 2021',
      medium: 'Lápiz y carboncillo',
      url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un retrato que captura la esencia de nuestra conexión, dibujado con todo el amor del mundo.',
      inspiration: 'Inspirado en una foto de nuestra primera cita, quería inmortalizarla para siempre.'
    },
    {
      id: 2,
      title: 'Corazones Entrelazados',
      date: 'Mayo 2021',
      medium: 'Acuarela',
      url: 'https://images.pexels.com/photos/1314644/pexels-photo-1314644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Dos corazones que se unen en una danza de colores, representando nuestro amor infinito.',
      inspiration: 'Creado después de una conversación profunda sobre nuestros sueños juntos.'
    },
    {
      id: 3,
      title: 'Nuestro Lugar Especial',
      date: 'Julio 2021',
      medium: 'Óleo sobre lienzo',
      url: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'El paisaje donde nos dimos nuestro primer beso, pintado desde el corazón.',
      inspiration: 'Quería capturar no solo el lugar, sino también la emoción de ese momento mágico.'
    },
    {
      id: 4,
      title: 'Manos Unidas',
      date: 'Septiembre 2021',
      medium: 'Tinta china',
      url: 'https://images.pexels.com/photos/1314678/pexels-photo-1314678.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Nuestras manos entrelazadas simbolizando la unión y el apoyo mutuo.',
      inspiration: 'Dibujado mientras reflexionaba sobre cómo siempre nos damos la mano en los momentos difíciles.'
    },
    {
      id: 5,
      title: 'Flores para Ti',
      date: 'Noviembre 2021',
      medium: 'Pastel seco',
      url: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un ramo eterno de flores que nunca se marchitarán, como nuestro amor.',
      inspiration: 'Inspirado en las flores que me regalaste en nuestro aniversario.'
    },
    {
      id: 6,
      title: 'Atardecer Juntos',
      date: 'Enero 2022',
      medium: 'Acrílico',
      url: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Dos siluetas contemplando el atardecer, prometiéndose mil atardeceres más.',
      inspiration: 'Basado en nuestra tradición de ver el atardecer juntos los domingos.'
    }
  ];

  getUniqueMedia() {
    return [...new Set(this.drawings.map(drawing => drawing.medium))];
  }

  openModal(drawing: any, index: number) {
    this.selectedDrawing = drawing;
    this.currentIndex = index;
    this.modalActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalActive = false;
    this.selectedDrawing = null;
    document.body.style.overflow = 'auto';
  }

  nextDrawing() {
    this.currentIndex = (this.currentIndex + 1) % this.drawings.length;
    this.selectedDrawing = this.drawings[this.currentIndex];
  }

  previousDrawing() {
    this.currentIndex = this.currentIndex === 0 ? 
      this.drawings.length - 1 : this.currentIndex - 1;
    this.selectedDrawing = this.drawings[this.currentIndex];
  }
}