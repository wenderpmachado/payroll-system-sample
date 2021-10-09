export function getMonth(date: Date): string {
  return (date.getMonth() + 1).toString().padStart(2, '0'); // when month is '2' -> '02'
}
