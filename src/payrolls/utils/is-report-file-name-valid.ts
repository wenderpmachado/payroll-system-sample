export function isReportFileNameValid(name: string): boolean {
  const regex = /^time-report-\d+.csv$/g;

  return regex.test(name);
}
