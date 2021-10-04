import { ITimeReportData, TJobGroup } from "src/interfaces/time-report-data";

export function extractTimeReportData(timeReportRow: string): ITimeReportData {
    const [dateString, hoursWorkedString, employeeIdString, jobGroupString] = timeReportRow.split(',');

    const [day, month, year] = dateString.split('/');
    const date = new Date(
        parseInt(year),
        parseInt(month)-1,
        parseInt(day)
    );

    const hoursWorked = parseFloat(hoursWorkedString.trim());
    const employeeId = parseInt(employeeIdString.trim());
    const jobGroup = jobGroupString.trim() as TJobGroup;

    return {
        date,
        hoursWorked,
        employeeId,
        jobGroup
    }
}