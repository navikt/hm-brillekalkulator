export const validering = {
  beløp(verdi: string): boolean {
    return /^\d+(,\d{1,2})?$/.test(verdi)
  },
}

export function validator(test: (verdi: string) => boolean, error: string): (verdi: string) => true | string {
  return (verdi) => {
    return test(verdi) || error
  }
}
