import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinExtras'
})
export class JoinExtrasPipe implements PipeTransform {
  transform(value: any[], property: string = 'nombre', separator: string = ', '): string {
    // Verifica si el valor es un array
    if (!Array.isArray(value)) {
      return '';
    }

    // Mapea el array para extraer la propiedad 'nombre' de cada objeto
    const propertyValues = value.map(extra => extra[property]);

    // Une los valores de las propiedades en una cadena con el delimitador proporcionado
    return propertyValues.join(separator);
  }
}
