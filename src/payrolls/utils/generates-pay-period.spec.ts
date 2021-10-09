import { PAY_PERIOD_OPTIONS } from "../../interfaces/time-report-data";
import { generatesPayPeriod } from "./generates-pay-period";

describe('generatesPayPeriod', () => {
  it('should generates an object from first half pay period', () => {
    const payPeriod = PAY_PERIOD_OPTIONS.FIRST_HALF;
    const date = '2021-10';

    const result = generatesPayPeriod(date, payPeriod);

    expect(result).toBeTruthy();
    expect(result.startDate).toBe(date + '-01');
    expect(result.endDate).toBe(date + '-15');
  });

  it('should generates an object from second half pay period, with last day equals 31', () => {
    const payPeriod = PAY_PERIOD_OPTIONS.SECOND_HALF;
    const date = '2021-10';

    const result = generatesPayPeriod(date, payPeriod);

    expect(result).toBeTruthy();
    expect(result.startDate).toBe(date + '-16');
    expect(result.endDate).toBe(date + '-31');
  });

  it('should generates an object from second half pay period, with last day equals 30', () => {
    const payPeriod = PAY_PERIOD_OPTIONS.SECOND_HALF;
    const date = '2021-09';

    const result = generatesPayPeriod(date, payPeriod);

    expect(result).toBeTruthy();
    expect(result.startDate).toBe(date + '-16');
    expect(result.endDate).toBe(date + '-30');
  });

  it('should generates an object from second half pay period, with last day equals 28', () => {
    const payPeriod = PAY_PERIOD_OPTIONS.SECOND_HALF;
    const date = '2021-02';

    const result = generatesPayPeriod(date, payPeriod);

    expect(result).toBeTruthy();
    expect(result.startDate).toBe(date + '-16');
    expect(result.endDate).toBe(date + '-28');
  });
});
