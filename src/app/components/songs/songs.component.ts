import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="songs-page">
      <div class="page-header">
        <div class="container">
          <h1><i class="fas fa-music"></i> Nuestra Banda Sonora</h1>
          <p>Las canciones que han acompañado nuestra historia de amor</p>
        </div>
      </div>

      <div class="songs-content container">
        <div class="player-section">
          <div class="current-playing" *ngIf="currentSong">
            <div class="song-artwork">
              <img [src]="currentSong.artwork" [alt]="currentSong.title">
              <div class="play-overlay">
                <button class="play-btn" (click)="togglePlay()">
                  <i [class]="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
              </div>
            </div>
            <div class="song-info">
              <h3>{{ currentSong.title }}</h3>
              <p class="artist">{{ currentSong.artist }}</p>
              <p class="memory">{{ currentSong.memory }}</p>
            </div>
          </div>
        </div>

        <div class="songs-categories">
          <button 
            *ngFor="let category of categories" 
            class="category-btn"
            [class.active]="activeCategory === category.value"
            (click)="setCategory(category.value)">
            <i [class]="category.icon"></i>
            {{ category.label }}
          </button>
        </div>

        <div class="songs-list">
          <div 
            *ngFor="let song of filteredSongs; let i = index" 
            class="song-item"
            [class.active]="currentSong?.id === song.id"
            (click)="selectSong(song)">
            <div class="song-artwork-small">
              <img [src]="song.artwork" [alt]="song.title">
              <div class="play-overlay-small">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="song-details">
              <h4>{{ song.title }}</h4>
              <p class="song-artist">{{ song.artist }}</p>
              <p class="song-category">{{ getCategoryLabel(song.category) }}</p>
            </div>
            <div class="song-memory">
              <p>{{ song.memory }}</p>
              <span class="song-date">{{ song.date }}</span>
            </div>
            <div class="song-actions">
              <button class="action-btn" (click)="$event.stopPropagation(); toggleFavorite(song)">
                <i [class]="song.favorite ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="playlist-stats">
          <div class="stat-card">
            <div class="stat-number">{{ songs.length }}</div>
            <div class="stat-label">Canciones Especiales</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getFavoriteCount() }}</div>
            <div class="stat-label">Favoritas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getUniqueArtists().length }}</div>
            <div class="stat-label">Artistas</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .songs-page {
      padding-top: 80px;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .page-header {
      background: rgba(0, 0, 0, 0.3);
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

    .songs-content {
      padding: 4rem 0;
    }

    .player-section {
      margin-bottom: 3rem;
    }

    .current-playing {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: var(--border-radius);
      padding: 2rem;
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 2rem;
      align-items: center;
      box-shadow: var(--shadow-hover);
    }

    .song-artwork {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: var(--border-radius);
      overflow: hidden;
    }

    .song-artwork img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .play-overlay {
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

    .song-artwork:hover .play-overlay {
      opacity: 1;
    }

    .play-btn {
      background: var(--primary-color);
      color: white;
      border: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .play-btn:hover {
      transform: scale(1.1);
    }

    .song-info h3 {
      font-size: 2rem;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .artist {
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .memory {
      color: var(--text-light);
      line-height: 1.6;
      font-style: italic;
    }

    .songs-categories {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .category-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.5rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 50px;
      cursor: pointer;
      transition: var(--transition);
      font-weight: 500;
      backdrop-filter: blur(10px);
    }

    .category-btn:hover,
    .category-btn.active {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .songs-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 4rem;
    }

    .song-item {
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--border-radius);
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 80px 1fr 2fr 60px;
      gap: 1.5rem;
      align-items: center;
      cursor: pointer;
      transition: var(--transition);
      backdrop-filter: blur(10px);
    }

    .song-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }

    .song-item.active {
      background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
      color: white;
    }

    .song-artwork-small {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 10px;
      overflow: hidden;
    }

    .song-artwork-small img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .play-overlay-small {
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

    .song-item:hover .play-overlay-small {
      opacity: 1;
    }

    .play-overlay-small i {
      color: white;
      font-size: 1.2rem;
    }

    .song-details h4 {
      font-size: 1.2rem;
      margin-bottom: 0.25rem;
    }

    .song-artist {
      color: var(--primary-color);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .song-category {
      color: var(--text-light);
      font-size: 0.9rem;
    }

    .song-item.active .song-artist,
    .song-item.active .song-category {
      color: rgba(255, 255, 255, 0.8);
    }

    .song-memory p {
      color: var(--text-light);
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .song-date {
      color: var(--accent-color);
      font-size: 0.9rem;
      font-weight: 500;
    }

    .song-item.active .song-memory p,
    .song-item.active .song-date {
      color: rgba(255, 255, 255, 0.8);
    }

    .action-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: var(--primary-color);
      cursor: pointer;
      transition: var(--transition);
    }

    .action-btn:hover {
      transform: scale(1.2);
    }

    .song-item.active .action-btn {
      color: white;
    }

    .playlist-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      border-radius: var(--border-radius);
      text-align: center;
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
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

    @media (max-width: 968px) {
      .current-playing {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .song-item {
        grid-template-columns: 1fr;
        gap: 1rem;
        text-align: center;
      }

      .song-artwork-small {
        justify-self: center;
      }
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 2.5rem;
      }

      .current-playing {
        padding: 1.5rem;
      }

      .song-info h3 {
        font-size: 1.5rem;
      }

      .categories {
        gap: 0.5rem;
      }

      .category-btn {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class SongsComponent {
  activeCategory = 'todas';
  currentSong: any = null;
  isPlaying = false;

  categories = [
    { label: 'Todas', value: 'todas', icon: 'fas fa-list' },
    { label: 'Románticas', value: 'romanticas', icon: 'fas fa-heart' },
    { label: 'Baile', value: 'baile', icon: 'fas fa-dancer' },
    { label: 'Especiales', value: 'especiales', icon: 'fas fa-star' },
    { label: 'Nostalgia', value: 'nostalgia', icon: 'fas fa-clock' }
  ];

  songs = [
    {
      id: 1,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      category: 'romanticas',
      date: 'Febrero 2020',
      memory: 'La canción que sonaba cuando nos dimos nuestro primer beso bajo las estrellas.',
      artwork: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true
    },
    {
      id: 2,
      title: 'Can\'t Help Myself',
      artist: 'Four Tops',
      category: 'baile',
      date: 'Abril 2020',
      memory: 'Nuestra canción de baile favorita en la cocina mientras cocinamos juntos.',
      artwork: 'https://images.pexels.com/photos/1314644/pexels-photo-1314644.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false
    },
    {
      id: 3,
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      category: 'especiales',
      date: 'Junio 2020',
      memory: 'La canción que elegimos para nuestro primer aniversario.',
      artwork: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true
    },
    {
      id: 4,
      title: 'Yellow',
      artist: 'Coldplay',
      category: 'nostalgia',
      date: 'Agosto 2020',
      memory: 'Sonaba en el radio durante nuestro primer viaje juntos por carretera.',
      artwork: 'https://images.pexels.com/photos/1314678/pexels-photo-1314678.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false
    },
    {
      id: 5,
      title: 'All of Me',
      artist: 'John Legend',
      category: 'romanticas',
      date: 'Octubre 2020',
      memory: 'La cantamos juntos en karaoke, aunque desafinamos completamente.',
      artwork: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true
    },
    {
      id: 6,
      title: 'Uptown Funk',
      artist: 'Bruno Mars',
      category: 'baile',
      date: 'Diciembre 2020',
      memory: 'Nuestra rutina de baile épica que siempre nos hace reír.',
      artwork: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false
    },
    {
      id: 7,
      title: 'Make You Feel My Love',
      artist: 'Adele',
      category: 'especiales',
      date: 'Febrero 2021',
      memory: 'La dedicaste en una noche difícil, y me hiciste sentir amada.',
      artwork: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true
    },
    {
      id: 8,
      title: 'Summer Breeze',
      artist: 'Seals and Crofts',
      category: 'nostalgia',
      date: 'Julio 2021',
      memory: 'Nuestros días de verano perezosos en el parque.',
      artwork: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false
    }
  ];

  constructor() {
    // Seleccionar la primera canción favorita como canción actual
    this.currentSong = this.songs.find(song => song.favorite) || this.songs[0];
  }

  get filteredSongs() {
    if (this.activeCategory === 'todas') {
      return this.songs;
    }
    return this.songs.filter(song => song.category === this.activeCategory);
  }

  setCategory(category: string) {
    this.activeCategory = category;
  }

  selectSong(song: any) {
    this.currentSong = song;
    this.isPlaying = true;
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  toggleFavorite(song: any) {
    song.favorite = !song.favorite;
  }

  getCategoryLabel(categoryValue: string): string {
    const category = this.categories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  }

  getFavoriteCount(): number {
    return this.songs.filter(song => song.favorite).length;
  }

  getUniqueArtists(): string[] {
    return [...new Set(this.songs.map(song => song.artist))];
  }
}