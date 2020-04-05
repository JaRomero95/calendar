import eventValidator from 'lib/eventValidator';

describe('eventValidator', () => {
  const validEvent = {
    title: 'Test title',
    start_date: '2020-04-01T00:00:00.000Z',
    end_date: '2020-04-01T02:00:00.000Z',
  };

  it('not return errors for valid event', () => {
    expect(eventValidator.validate(validEvent)).toEqual({});
  });

  describe('title werors', () => {
    it('Title can not be blank', () => {
      const event = {
        ...validEvent,
        title: '',
      };

      expect(eventValidator.validate(event)).toEqual({title: "Can't be blank"});
    });

    it('Title length can not be greeater than 60', () => {
      const event = {
        ...validEvent,
        title: 'A'.repeat(61),
      };

      expect(eventValidator.validate(event)).toEqual({
        title: 'Is too long (maximum is 60 characters)',
      });
    });
  });

  describe('date errors', () => {
    it('End date can not be less than start date', () => {
      const event = {
        ...validEvent,
        start_date: '2020-04-01T02:00:01.000Z',
        end_date: '2020-04-01T02:00:00.000Z',
      };

      expect(eventValidator.validate(event)).toEqual({
        end_date: 'End date must be greater than start date',
      });
    });
  });
});
