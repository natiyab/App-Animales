import { Component } from '@angular/core';
import { Animales } from './animales/animales';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Animales],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}