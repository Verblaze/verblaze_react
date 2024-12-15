export class VerblazeException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VerblazeException'
  }
}
