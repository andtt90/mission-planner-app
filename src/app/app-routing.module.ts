import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'homepage', loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'planner', loadChildren: () => import('./modules/planner/planner.module').then(m => m.PlannerModule) },
  { path: 'player', loadChildren: () => import('./modules/player/player.module').then(m => m.PlayerModule) },
  { path: '', redirectTo: '/homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
