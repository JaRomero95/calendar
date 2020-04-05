import moment from 'moment';
import apiEvents from 'api/modules/events';
import httpClient from 'api/httpClient';

jest.mock('api/httpClient');

describe('API events', () => {
  const event = {id: 'test-event'};
  const eventErrors = {title: "Can't be blank"};

  beforeAll(() => {
    httpClient.get = jest.fn();
    httpClient.put = jest.fn();
    httpClient.post = jest.fn();
    httpClient.delete = jest.fn();
  });

  describe('index', () => {
    const events = [event];

    beforeAll(() => {
      mockHttpData('get', events);
    });

    it('returns events', async () => {
      const params = {
        startDateFrom: moment(),
        startDateUntil: moment(),
      };

      expect(await apiEvents.index(params)).toEqual(events);
    });
  });

  describe('update', () => {
    describe('when request is ok', () => {
      beforeAll(() => {
        mockHttpData('put', event);
      });

      it('returns event', async () => {
        const params = {id: 1};

        expect(await apiEvents.update(params)).toEqual([event, null]);
      });
    });

    describe('when request is bad', () => {
      beforeAll(() => {
        mockHttpErrors('put', eventErrors);
      });

      it('returns errors', async () => {
        const params = {id: 1};

        expect(await apiEvents.update(params)).toEqual([null, eventErrors]);
      });
    });
  });

  describe('create', () => {
    describe('when request is ok', () => {
      beforeAll(() => {
        mockHttpData('post', event);
      });

      it('returns event', async () => {
        expect(await apiEvents.create({})).toEqual([event, null]);
      });
    });

    describe('when request is bad', () => {
      beforeAll(() => {
        mockHttpErrors('post', eventErrors);
      });

      it('returns errors', async () => {
        expect(await apiEvents.create({})).toEqual([null, eventErrors]);
      });
    });
  });

  describe('destroy', () => {
    it('returns null', async () => {
      expect(await apiEvents.destroy('id')).toBeUndefined();
    });
  });
});

function mockHttpData(httpMethod, data) {
  httpClient[httpMethod].mockImplementation(() => ({
    data: {data},
  }));
}

function mockHttpErrors(httpMethod, errors) {
  httpClient[httpMethod].mockRejectedValue({response: {data: {errors}}});
}
