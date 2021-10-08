import { getMonth } from './get-month';

describe('getMonth', () => {
  it('should get month, in string format', async () => {
    const date = new Date(2021, 0); // 2021-01

    const result = await getMonth(date);

    expect(result).toBeTruthy();
    expect(result.length).toBe(2);
    expect(result).toBe('01');
  });
});
