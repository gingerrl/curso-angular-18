import { Component, input } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  standalone: true,
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
character= input.required<Character[]>();

listName= input.required<string>();

}
