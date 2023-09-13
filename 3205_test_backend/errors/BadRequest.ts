class ValidationError extends Error {
  statusCode: number;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
