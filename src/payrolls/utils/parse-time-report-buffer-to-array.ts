import { parseBufferToArray } from "../../helpers/parse-buffer-to-array";
import { ITimeReportData } from "../../interfaces/time-report-data";
import { extractTimeReportDataFromArray } from "./extract-time-report-data";

export async function parseTimeReportBufferToArray(buffer: Buffer): Promise<ITimeReportData[]> {
  const [header, ...rows] = await parseBufferToArray<ITimeReportData>(buffer, extractTimeReportDataFromArray);

  return rows;
}
