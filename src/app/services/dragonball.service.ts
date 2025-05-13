import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : [];
};

@Injectable({ providedIn: 'root' })
export class DragonballService {
  character = signal<Character[]>(loadFromLocalStorage());
  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.character()));
    console.log(`character count ${this.character().length}`);
  });

  addCharacter(character: Character) {
    console.log(character);
    this.character.update((list) => [...list, character]);
  }
}
