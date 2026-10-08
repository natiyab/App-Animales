import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService, Animal } from '../services/animal.service';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animales.html',
  styleUrl: './animales.css'
})
export class Animales implements OnInit {

  animales: Animal[] = [];

  cargando = true;

  error = '';

  constructor(
    private animalService: AnimalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('INICIANDO CATÁLOGO...');

    this.animalService.obtenerRazas().subscribe({

      next: (datos) => {

        console.log('RAZAS RECIBIDAS:', datos);

        const razas = Object.keys(datos.message);

        console.log('CANTIDAD DE RAZAS:', razas.length);

       
        const seleccionadas = razas;

        seleccionadas.forEach(raza => {

          this.cargarAnimal(raza);

        });

      },

      error: (error) => {

        console.error('ERROR AL OBTENER RAZAS:', error);

        this.error = 'No se pudieron cargar las razas.';

        this.cargando = false;

        this.cd.detectChanges();
      }

    });
  }

  cargarAnimal(raza: string): void {

    this.animalService.obtenerImagen(raza).subscribe({

      next: (datos) => {

        console.log('IMAGEN DE', raza, datos);

        const nombreRaza = this.formatearRaza(raza);

        const animal: Animal = {

          raza: nombreRaza,

          imagen: datos.message,

          descripcion: this.obtenerDescripcion(nombreRaza)

        };

        this.animales.push(animal);

        this.cargando = false;

        this.cd.detectChanges();

      },

      error: (error) => {

        console.error('ERROR CON', raza, error);

      }

    });
  }

  formatearRaza(raza: string): string {

    return raza
      .split('-')
      .map(palabra =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1)
      )
      .join(' ');
  }

  obtenerDescripcion(raza: string): string {

    const descripciones: { [key: string]: string } = {

      'Affenpinscher':
        'Perro pequeño, curioso, inteligente y lleno de personalidad.',

      'African Wild':
        'Perro de aspecto atlético, resistente y muy activo.',

      'Airedale':
        'Terrier inteligente, activo y conocido por su carácter valiente.',

      'Akita':
        'Perro fuerte, leal, independiente y protector.',

      'Appenzeller':
        'Perro activo, inteligente y excelente para actividades al aire libre.',

      'Australian Kelpie':
        'Perro pastor muy inteligente, energético y trabajador.',

      'Australian Shepherd':
        'Perro inteligente, activo y excelente para el entrenamiento.',

      'Basenji':
        'Perro elegante, independiente, curioso y muy inteligente.',

      'Beagle':
        'Perro alegre, amigable y conocido por su excelente olfato.',

      'Bluetick':
        'Perro activo, resistente y excelente rastreador.',

      'Borzoi':
        'Perro elegante, tranquilo y de gran velocidad.',

      'Bouvier':
        'Perro fuerte, inteligente y tradicionalmente utilizado como perro de trabajo.'
    };

    return descripciones[raza] ||
      'Perro de compañía con características únicas y una personalidad especial.';
  }
}