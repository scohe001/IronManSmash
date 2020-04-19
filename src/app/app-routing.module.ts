import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';


const routes: Routes = [
  // { path: 'help', component: HelpComponent },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
  { path: '**', component: CharacterSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
