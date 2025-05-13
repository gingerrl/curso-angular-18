import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-page',
  standalone: true,
  imports: [],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
  name = signal('Gohan');
  power = signal(100);

  character = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001,
    },
    // {
    //   id: 2,
    //   name: 'Vegeta',
    //   power: 8000,
    // },
    // {
    //   id: 3,
    //   name: 'Piccolo',
    //   power: 3000,
    // },
    // {
    //   id: 4,
    //   name: 'Yamcha',
    //   power: 500,
    // },
  ]);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.character().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.character.update((list) => [...list, newCharacter]);
    this.resetFields()
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

  // powerClasses = computed(() =>{
  //   return {
  //     'text-danger' : true
  //   }
  // })
}
