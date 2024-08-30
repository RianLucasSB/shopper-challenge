export class InvalidMeasureTypeError extends Error {
  constructor() {
    super(`Tipo de medição não permitida`);
    this.name = 'InvalidMeasureTypeError';
  }
}
