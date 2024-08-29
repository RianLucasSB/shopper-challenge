export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Parâmetro obrigátorio: ${paramName}`);
    this.name = 'MissingParamError';
  }
}
