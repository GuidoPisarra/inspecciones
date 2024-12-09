export class ImagenVehiculo {
  protected archivo?: File;
  protected confianza?: number;
  protected clase?: string;
  //const IMAGEN_A_DETECTAR = 'car';
  private IMAGEN_A_DETECTAR: string = 'person';

  constructor(archivoNew: File, confianzaNew: number, claseNew: string) {
    this.archivo = archivoNew;
    this.confianza = confianzaNew;
    this.clase = claseNew;
  }

  public getArchivo(): File | undefined {
    return this.archivo;
  }

  public getConfianza(): number | undefined {
    return this.confianza;
  }

  public getClase(): string | undefined {
    return this.clase;
  }

  public esValida(): boolean {
    return this.IMAGEN_A_DETECTAR === this.getClase();
  }


}
