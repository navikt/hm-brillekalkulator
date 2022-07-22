export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
}
