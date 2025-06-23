import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']

})
export class PhotosComponent {
  activeFilter = 'todos';
  modalActive = false;
  selectedPhoto: any = null;
  currentIndex = 0;

  filters = [
    { label: 'Todos', value: 'todos', icon: 'fas fa-th' },
    { label: 'Aventuras', value: 'aventuras', icon: 'fas fa-mountain' },
    { label: 'Citas', value: 'citas', icon: 'fas fa-heart' },
    { label: 'Celebraciones', value: 'celebraciones', icon: 'fas fa-birthday-cake' },
    { label: 'Viajes', value: 'viajes', icon: 'fas fa-plane' }
  ];

  photos = [
    {
      id: 1,
      title: 'Primera Cita',
      date: 'Agosto 2023',
      category: 'citas',
      url: 'assets/cita1.jpg',
      description: 'El día que cambió nuestras vidas para siempre. Nervios, sonrisas, FNAF y el inicio de algo mágico.'
    },
    {
      id: 2,
      title: 'Aventura en la Montaña',
      date: 'Abril 2020',
      category: 'aventuras',
      url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Conquistando cimas juntos, descubriendo que somos el equipo perfecto.'
    },
    {
      id: 3,
      title: 'Cumpleaños Especial',
      date: 'Junio 2020',
      category: 'celebraciones',
      url: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Celebrando la vida juntos, creando tradiciones que perdurarán para siempre.'
    },
    {
      id: 4,
      title: 'Escapada Romántica',
      date: 'Agosto 2020',
      category: 'celebraciones',
      url: 'https://images.pexels.com/photos/1024974/pexels-photo-1024974.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Nuestro primer viaje juntos, descubriendo lugares nuevos y fortaleciendo nuestro amor.'
    },
    {
      id: 5,
      title: 'Cena bajo las Estrellas',
      date: 'Agosto 2023',
      category: 'citas',
      url: './photosImages/cita1.jpg',
      description: 'Una noche mágica recordando por qué nos enamoramos cada día más.'
    },
    {
      id: 6,
      title: 'Senderismo de Otoño',
      date: 'Octubre 2020',
      category: 'aventuras',
      url: 'https://images.pexels.com/photos/1024972/pexels-photo-1024972.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Colores otoñales acompañando nuestros pasos hacia nuevas aventuras.'
    },
    {
      id: 7,
      title: 'Reencuentro Viva',
      date: 'Enero 2024',
      category: 'citas',
      url: 'assets/cita4.jpeg',
      description: 'Colores otoñales acompañando nuestros pasos hacia nuevas aventuras.'
    }
  ];

  get filteredPhotos() {
    if (this.activeFilter === 'todos') {
      return this.photos;
    }
    return this.photos.filter(photo => photo.category === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  openModal(photo: any, index: number) {
    this.selectedPhoto = photo;
    this.currentIndex = this.filteredPhotos.findIndex(p => p.id === photo.id);
    this.modalActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalActive = false;
    this.selectedPhoto = null;
    document.body.style.overflow = 'auto';
  }

  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredPhotos.length;
    this.selectedPhoto = this.filteredPhotos[this.currentIndex];
  }

  previousPhoto() {
    this.currentIndex = this.currentIndex === 0 ? 
      this.filteredPhotos.length - 1 : this.currentIndex - 1;
    this.selectedPhoto = this.filteredPhotos[this.currentIndex];
  }
}