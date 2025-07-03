import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PalletComponent } from "./pallet/pallet.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PalletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'treepoc';
}
