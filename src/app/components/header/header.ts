import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  showMenu = input(true);
  menuOpen = input(false);

  @Output()
  menuClick = new EventEmitter<void>();

}
