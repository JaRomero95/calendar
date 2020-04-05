import dateRangeCalculator from 'lib/dateRangeCalculator';

describe('dateRangeCalculator', () => {
  const start = '2020-01-01T02:14:31.000Z';
  const expectedStart = '2020-01-01T00:00:00.000Z';

  const end = '2020-01-31T04:15:32.000Z';
  const expectedEnd = '2020-01-31T23:59:59.999Z';

  describe('month', () => {
    const params = {start, end};

    it('returns correct start date', () => {
      expectDate('month', params, 'startDateFrom', expectedStart);
    });

    it('returns correct end date', () => {
      expectDate('month', params, 'startDateUntil', expectedEnd);
    });
  });

  describe('agenda', () => {
    const params = {start, end};

    it('returns correct start date', () => {
      expectDate('agenda', params, 'startDateFrom', expectedStart);
    });

    it('returns correct end date', () => {
      expectDate('agenda', params, 'startDateUntil', expectedEnd);
    });
  });

  describe('week', () => {
    const params = [start, end];

    it('returns correct start date', () => {
      expectDate('week', params, 'startDateFrom', expectedStart);
    });

    it('returns correct end date', () => {
      expectDate('week', params, 'startDateUntil', expectedEnd);
    });
  });

  describe('day', () => {
    const params = [start, end];

    it('returns correct start date', () => {
      expectDate('day', params, 'startDateFrom', expectedStart);
    });

    it('returns correct end date', () => {
      expectDate('day', params, 'startDateUntil', expectedEnd);
    });
  });
});

function expectDate(methodName, params, dateField, value) {
  expect(dateRangeCalculator[methodName](params)[dateField].toISOString()).toEqual(value);
}
