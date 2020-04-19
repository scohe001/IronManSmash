import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { IronManComponent } from './iron-man/iron-man.component';


const routes: Routes = [
  { path: 'IronMan/:fighterlist', component: IronManComponent},
  { path: 'FighterSelection', component: CharacterSelectionComponent },
  { path: '', redirectTo: 'FighterSelection', pathMatch: 'full' },
  { path: '**', redirectTo: 'FighterSelection' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
