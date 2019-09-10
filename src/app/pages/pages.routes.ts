import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';

const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de progreso'} },
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficos de donas'} },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas vacias'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Reactive Extension'} },
  { path: 'accountSettings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema'} },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil del usuario'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
  // Mantenimiento
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard],
    data: { titulo: 'Mantenimiento de usuarios'}
  },
  { path: 'hospitales', component: HospitalComponent, data: { titulo: 'Mantenimiento de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medicos'} },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
