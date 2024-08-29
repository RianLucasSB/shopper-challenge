export class MeasureNotFoundError extends Error {
  constructor() {
    super(`Leitura não encontrada`);
    this.name = 'MeasureNotFoundError';
  }
}
