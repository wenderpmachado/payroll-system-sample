/**
* Extract the report id number
* @param reportName The report name (e.g. time-report-1.csv)
* @returns reportId
*/
export function extractTimeReportId(reportName: string): number {
  const prefix = 'time-report-';
  const sufix = '.'; // could be .csv or other extension

  const [, reportId] = reportName.split(prefix);

  const [stringReportId] = reportId.split(sufix);

  return parseInt(stringReportId);
}
