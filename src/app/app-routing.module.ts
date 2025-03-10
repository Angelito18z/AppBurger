import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'foto',
    loadChildren: () => import('./Pages/foto/foto.module').then( m => m.FotoPageModule)
  },  {
    path: 'qr',
    loadChildren: () => import('./Pages/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'social',
    loadChildren: () => import('./Pages/social/social.module').then( m => m.SocialPageModule)
  },
  {
    path: 'google',
    loadChildren: () => import('./Pages/google/google.module').then( m => m.GooglePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
