import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhotosComponent } from './components/photos/photos.component';
import { DrawingsComponent } from './components/drawings/drawings.component';
import { SongsComponent } from './components/songs/songs.component';
import { HalloweenComponent } from './components/halloween/halloween.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fotos', component: PhotosComponent },
  { path: 'dibujos', component: DrawingsComponent },
  { path: 'canciones', component: SongsComponent },
  { path: 'halloween', component: HalloweenComponent },
  { path: '**', redirectTo: '' }
];