import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './core/components/manage-user/manage-user.component';
import { AddUserComponent } from './core/components/add-user/add-user.component';
import { RouteNotFoundComponent } from './core/components/route-not-found/route-not-found.component';
import { EditUserComponent } from './core/components/edit-user/edit-user.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: ManageUserComponent,
  },
  {
    path: 'user/insertUser',
    component: AddUserComponent,
  },
  {
    path: 'user/:id',
    component: EditUserComponent,
  },

  { path: '**', component: RouteNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
