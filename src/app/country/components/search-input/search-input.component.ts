import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  search = output<string>();
  debounceTime = input(300);

  initialValue= input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debonceEffect = effect((onCleanup) => {
    const value= this.inputValue();

    const timeout = setTimeout(() => {
        this.search.emit(value)
    }, this.debounceTime());

    onCleanup(() =>{
      clearTimeout(timeout)
    })
  });
}
