import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CharactersComponent} from './characters/characters.component';
import {CharacterDetailsComponent} from './character-details/character-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: CharactersComponent},
  {path: 'characters/:name', component: CharacterDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
