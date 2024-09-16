type ValidColors = 'negro' | 'blanco' | 'rojo' | 'azul' | 'verde' | 'rosa' | 'amarillo' | 'gris' | 'naranja' | 'violeta' | 'bordo' | 'fucsia' | 'beige' | 'celeste' | 'arcoiris' | 'animal_print' | 'amarillo_fluo' | 'naranja_fluo';

export function getTailwindBgClass(color: ValidColors): string {
  switch (color) {
    case 'negro':
      return 'bg-black';
    case 'blanco':
      return 'bg-white';
    case 'rojo':
      return 'bg-rojo';
    case 'azul':
      return 'bg-azul';
    case 'verde':
      return 'bg-verde';
    case 'rosa':
      return 'bg-rosa';
    case 'amarillo':
      return 'bg-amarillo';
    case 'gris':
      return 'bg-gray-500';
    case 'naranja':
      return 'bg-naranja';
    case 'violeta':
      return 'bg-violeta';
    case 'bordo':
      return 'bg-bordo';
    case 'fucsia':
      return 'bg-fucsia';
    case 'beige':
      return 'bg-beige'; // Ajustar si se usa Tailwind JIT para soporte personalizado
    case 'celeste':
      return 'bg-celeste';
    case 'arcoiris':
      return 'bg-arcoiris';
    case 'animal_print':
      return 'bg-animal-print';
    case 'amarillo_fluo':
      return 'bg-amarillo-fluo';
    case 'naranja_fluo':
      return 'bg-naranja-fluo';
    default:
      return '';
  }
}
