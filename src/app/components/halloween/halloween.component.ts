import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-halloween',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="halloween-page">
      <div class="page-header">
        <div class="container">
          <h1><i class="fas fa-ghost spooky-icon"></i> Halloween Juntos</h1>
          <p>Nuestras aventuras más divertidas y espeluznantes</p>
        </div>
      </div>

      <div class="halloween-content container">
        <div class="halloween-intro">
          <div class="intro-card">
            <div class="intro-icon">
              <i class="fas fa-mask"></i>
            </div>
            <div class="intro-text">
              <h2>Noches de Terror y Diversión</h2>
              <p>
                Cada Halloween creamos nuevos recuerdos espeluznantes y divertidos. 
                Desde disfraces creativos hasta noches de películas de terror, 
                aquí están nuestras aventuras más memorables.
              </p>
            </div>
          </div>
        </div>

        <div class="costumes-section">
          <h2 class="section-title">
            <i class="fas fa-theater-masks"></i>
            Nuestros Disfraces
          </h2>
          <div class="costumes-grid">
            <div *ngFor="let costume of costumes" class="costume-card" (click)="openModal(costume, 'costume')">
              <div class="costume-image">
                <img [src]="costume.image" [alt]="costume.title" loading="lazy">
                <div class="costume-overlay">
                  <i class="fas fa-eye"></i>
                  <span>Ver Más</span>
                </div>
              </div>
              <div class="costume-info">
                <h3>{{ costume.title }}</h3>
                <p class="costume-year">{{ costume.year }}</p>
                <p class="costume-description">{{ costume.description }}</p>
                <div class="costume-rating">
                  <span>Creatividad:</span>
                  <div class="stars">
                    <i *ngFor="let star of getStars(costume.creativity)" class="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="activities-section">
          <h2 class="section-title">
            <i class="fas fa-spider"></i>
            Actividades Terroríficas
          </h2>
          <div class="activities-timeline">
            <div *ngFor="let activity of activities; let i = index" 
                 class="activity-item"
                 [class.left]="i % 2 === 0"
                 [class.right]="i % 2 === 1"
                 (click)="openModal(activity, 'activity')">
              <div class="activity-icon">
                <i [class]="activity.icon"></i>
              </div>
              <div class="activity-content">
                <h3>{{ activity.title }}</h3>
                <p class="activity-date">{{ activity.date }}</p>
                <p class="activity-description">{{ activity.description }}</p>
                <div class="activity-fun-level">
                  <span>Diversión:</span>
                  <div class="pumpkins">
                    <i *ngFor="let pumpkin of getPumpkins(activity.funLevel)" class="fas fa-pumpkin-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="memories-section">
          <h2 class="section-title">
            <i class="fas fa-camera-retro"></i>
            Momentos Especiales
          </h2>
          <div class="memories-gallery">
            <div *ngFor="let memory of memories" 
                 class="memory-card"
                 (click)="openModal(memory, 'memory')">
              <img [src]="memory.image" [alt]="memory.title" loading="lazy">
              <div class="memory-overlay">
                <h4>{{ memory.title }}</h4>
                <p>{{ memory.year }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="halloween-stats">
          <div class="stat-card spooky">
            <div class="stat-icon"><i class="fas fa-ghost"></i></div>
            <div class="stat-number">{{ costumes.length }}</div>
            <div class="stat-label">Disfraces Épicos</div>
          </div>
          <div class="stat-card spooky">
            <div class="stat-icon"><i class="fas fa-spider"></i></div>
            <div class="stat-number">{{ activities.length }}</div>
            <div class="stat-label">Aventuras Terroríficas</div>
          </div>
          <div class="stat-card spooky">
            <div class="stat-icon"><i class="fas fa-candy-cane"></i></div>
            <div class="stat-number">∞</div>
            <div class="stat-label">Dulces Compartidos</div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal" [class.active]="modalActive" (click)="closeModal()">
        <div class="modal-content spooky-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-body" *ngIf="selectedItem">
            <div class="modal-image" *ngIf="selectedItem.image">
              <img [src]="selectedItem.image" [alt]="selectedItem.title">
            </div>
            <div class="modal-info">
              <h3>{{ selectedItem.title }}</h3>
              <p class="modal-date">{{ selectedItem.year || selectedItem.date }}</p>
              <p class="modal-description">{{ selectedItem.description }}</p>
              <div class="modal-details" *ngIf="selectedItem.details">
                <h4>Detalles:</h4>
                <p>{{ selectedItem.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .halloween-page {
      padding-top: 80px;
      min-height: 100vh;
      background: linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #ff6b35 100%);
      position: relative;
    }

    .halloween-page::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="spiders" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23000" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23spiders)"/></svg>');
      pointer-events: none;
      z-index: 0;
    }

    .halloween-content {
      position: relative;
      z-index: 1;
    }

    .page-header {
      background: rgba(0, 0, 0, 0.8);
      color: #ff6b35;
      padding: 4rem 0;
      text-align: center;
      position: relative;
    }

    .page-header::before {
      content: '🎃 👻 🕷️ 🦇 🍭';
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      animation: float 3s ease-in-out infinite;
    }

    .spooky-icon {
      animation: spookyFloat 2s ease-in-out infinite;
    }

    @keyframes spookyFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }

    @keyframes float {
      0%, 100% { transform: translateX(-50%) translateY(0px); }
      50% { transform: translateX(-50%) translateY(-10px); }
    }

    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-family: 'Dancing Script', cursive;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .halloween-content {
      padding: 4rem 0;
    }

    .halloween-intro {
      margin-bottom: 4rem;
    }

    .intro-card {
      background: rgba(0, 0, 0, 0.8);
      color: #ff6b35;
      border-radius: var(--border-radius);
      padding: 3rem;
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 2rem;
      align-items: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border: 2px solid #ff6b35;
    }

    .intro-icon {
      font-size: 4rem;
      text-align: center;
      animation: spookyFloat 2s ease-in-out infinite;
    }

    .intro-text h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-family: 'Dancing Script', cursive;
    }

    .intro-text p {
      line-height: 1.6;
      opacity: 0.9;
    }

    .section-title {
      font-size: 2.5rem;
      color: #ff6b35;
      text-align: center;
      margin-bottom: 3rem;
      font-family: 'Dancing Script', cursive;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .section-title i {
      animation: spookyFloat 2s ease-in-out infinite;
    }

    .costumes-section {
      margin-bottom: 5rem;
    }

    .costumes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .costume-card {
      background: rgba(0, 0, 0, 0.8);
      border-radius: var(--border-radius);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition);
      border: 2px solid #ff6b35;
    }

    .costume-card:hover {
      transform: translateY(-10px) rotate(1deg);
      box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
    }

    .costume-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .costume-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .costume-card:hover .costume-image img {
      transform: scale(1.1);
    }

    .costume-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 107, 53, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);
      color: white;
    }

    .costume-card:hover .costume-overlay {
      opacity: 1;
    }

    .costume-overlay i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .costume-info {
      padding: 2rem;
      color: #ff6b35;
    }

    .costume-info h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .costume-year {
      color: #ffa500;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .costume-description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .costume-rating {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stars {
      display: flex;
      gap: 0.2rem;
    }

    .stars i {
      color: #ffa500;
    }

    .activities-section {
      margin-bottom: 5rem;
    }

    .activities-timeline {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
    }

    .activities-timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, #ff6b35, #ffa500);
      transform: translateX(-50%);
    }

    .activity-item {
      position: relative;
      margin-bottom: 3rem;
      cursor: pointer;
    }

    .activity-item.left {
      padding-right: 60%;
    }

    .activity-item.right {
      padding-left: 60%;
      text-align: right;
    }

    .activity-icon {
      position: absolute;
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
      width: 60px;
      height: 60px;
      background: #ff6b35;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      z-index: 2;
      transition: var(--transition);
    }

    .activity-item:hover .activity-icon {
      transform: translateX(-50%) scale(1.2) rotate(360deg);
    }

    .activity-content {
      background: rgba(0, 0, 0, 0.8);
      padding: 2rem;
      border-radius: var(--border-radius);
      color: #ff6b35;
      border: 2px solid #ff6b35;
      transition: var(--transition);
    }

    .activity-item:hover .activity-content {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(255, 107, 53, 0.3);
    }

    .activity-content h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .activity-date {
      color: #ffa500;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .activity-description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .activity-fun-level {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .pumpkins {
      display: flex;
      gap: 0.2rem;
    }

    .pumpkins i {
      color: #ffa500;
    }

    .memories-section {
      margin-bottom: 4rem;
    }

    .memories-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .memory-card {
      position: relative;
      aspect-ratio: 1;
      border-radius: var(--border-radius);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition);
      border: 3px solid #ff6b35;
    }

    .memory-card:hover {
      transform: translateY(-5px) rotate(-2deg);
      box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
    }

    .memory-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .memory-card:hover img {
      transform: scale(1.1);
    }

    .memory-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
      color: #ff6b35;
      padding: 2rem 1rem 1rem;
      transform: translateY(100%);
      transition: var(--transition);
    }

    .memory-card:hover .memory-overlay {
      transform: translateY(0);
    }

    .memory-overlay h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .halloween-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .stat-card.spooky {
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid #ff6b35;
      color: #ff6b35;
      transition: var(--transition);
    }

    .stat-card.spooky:hover {
      transform: translateY(-10px) rotate(2deg);
      box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      animation: spookyFloat 2s ease-in-out infinite;
    }

    /* Modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
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

    .spooky-modal {
      background: rgba(0, 0, 0, 0.9);
      border: 3px solid #ff6b35;
      box-shadow: 0 0 50px rgba(255, 107, 53, 0.5);
    }

    .modal-close {
      background: #ff6b35;
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 1.2rem;
      transition: var(--transition);
    }

    .modal-close:hover {
      transform: scale(1.2) rotate(180deg);
    }

    .modal-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 800px;
    }

    .modal-image img {
      width: 100%;
      height: auto;
      border-radius: var(--border-radius);
    }

    .modal-info {
      color: #ff6b35;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .modal-info h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .modal-date {
      color: #ffa500;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .modal-description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .modal-details h4 {
      margin-bottom: 0.5rem;
    }

    .modal-details p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
    }

    @media (max-width: 968px) {
      .intro-card {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .activities-timeline::before {
        left: 30px;
      }

      .activity-item.left,
      .activity-item.right {
        padding-left: 80px;
        padding-right: 0;
        text-align: left;
      }

      .activity-icon {
        left: 30px;
      }

      .modal-body {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 2.5rem;
      }

      .section-title {
        font-size: 2rem;
        flex-direction: column;
        gap: 0.5rem;
      }

      .costumes-grid {
        grid-template-columns: 1fr;
      }

      .memories-gallery {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
  `]
})
export class HalloweenComponent {
  modalActive = false;
  selectedItem: any = null;
  modalType: 'costume' | 'activity' | 'memory' = 'costume';

  costumes = [
    {
      id: 1,
      title: 'Vampiros Clásicos',
      year: '2020',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Nuestro primer Halloween juntos como la pareja de vampiros más elegante.',
      creativity: 4,
      details: 'Pasamos semanas perfeccionando los detalles: colmillos, capas vintage y maquillaje profesional.'
    },
    {
      id: 2,
      title: 'Superhéroes Retro',
      year: '2021',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'El dúo dinámico que salvó Halloween con estilo vintage.',
      creativity: 5,
      details: 'Diseñamos nuestros propios disfraces inspirados en los cómics de los años 60.'
    },
    {
      id: 3,
      title: 'Personajes de Cuento',
      year: '2022',
      image: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Una versión moderna y terrorífica de nuestros cuentos favoritos.',
      creativity: 5,
      details: 'Reinterpretamos clásicos cuentos de hadas con un toque oscuro y romántico.'
    },
    {
      id: 4,
      title: 'Zombies Elegantes',
      year: '2023',
      image: 'https://images.pexels.com/photos/1024974/pexels-photo-1024974.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Muerte glamorosa: zombies que no perdieron su estilo.',
      creativity: 4,
      details: 'El reto era verse aterrador pero mantener la elegancia. ¡Lo logramos!'
    }
  ];

  activities = [
    {
      id: 1,
      title: 'Casa Embrujada Extrema',
      date: 'Octubre 2020',
      icon: 'fas fa-home',
      description: 'Nuestra primera experiencia en una casa del terror profesional. Gritos, risas y muchos sustos.',
      funLevel: 5,
      details: 'Tardamos 2 horas en completar el recorrido porque no parábamos de reír entre sustos.'
    },
    {
      id: 2,
      title: 'Noche de Películas Terror',
      date: 'Octubre 2021',
      icon: 'fas fa-film',
      description: 'Maratón de películas clásicas de terror con palomitas y muchas mantas.',
      funLevel: 4,
      details: 'Vimos 6 películas seguidas y terminamos durmiendo abrazados en el sofá.'
    },
    {
      id: 3,
      title: 'Decoración Épica',
      date: 'Octubre 2022',
      icon: 'fas fa-pumpkin-alt',
      description: 'Convertimos nuestra casa en la más terrorífica del vecindario.',
      funLevel: 5,
      details: 'Esqueletos, telarañas, luces spooky y una máquina de niebla. ¡Los niños se asustaban desde la calle!'
    },
    {
      id: 4,
      title: 'Búsqueda del Tesoro Nocturna',
      date: 'Octubre 2023',
      icon: 'fas fa-map',
      description: 'Una aventura misteriosa por la ciudad buscando pistas escalofriantes.',
      funLevel: 5,
      details: 'Creamos pistas con acertijos terroríficos que nos llevaron por lugares embrujados de la ciudad.'
    }
  ];

  memories = [
    {
      id: 1,
      title: 'Primera Calabaza Tallada',
      year: '2020',
      image: 'https://images.pexels.com/photos/1024973/pexels-photo-1024973.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Concurso de Disfraces',
      year: '2021',
      image: 'https://images.pexels.com/photos/1024972/pexels-photo-1024972.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Dulces Compartidos',
      year: '2022',
      image: 'https://images.pexels.com/photos/1314644/pexels-photo-1314644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Foto Espeluznante',
      year: '2023',
      image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  getStars(rating: number): any[] {
    return Array(rating).fill(0);
  }

  getPumpkins(level: number): any[] {
    return Array(level).fill(0);
  }

  openModal(item: any, type: 'costume' | 'activity' | 'memory') {
    this.selectedItem = item;
    this.modalType = type;
    this.modalActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalActive = false;
    this.selectedItem = null;
    document.body.style.overflow = 'auto';
  }
}