import httpClient from '../httpClient';

const eventsUrl = '/events';
const eventUrl = id => `${eventsUrl}/${id}`;

const index = async ({startDateFrom, startDateUntil}) => {
  const params = {
    'filter[start_date_from]': startDateFrom,
    'filter[start_date_until]': startDateUntil,
  };

  const response = await httpClient.get(eventsUrl, {params});

  return response.data.data;
};

// FIXME: to much repeated core with create
const update = async event => {
  try {
    const response = await httpClient.put(eventUrl(event.id), {data: event});

    return [response.data.data, null];
  } catch (error) {
    if (error.response) {
      return [null, error.response.data.errors];
    }

    throw error;
  }
};

const create = async event => {
  try {
    const response = await httpClient.post(eventsUrl, {data: event});

    return [response.data.data, null];
  } catch (error) {
    if (error.response) {
      return [null, error.response.data.errors];
    }

    throw error;
  }
};

const destroy = eventId => {
  httpClient.delete(eventUrl(eventId));
};

export default {
  index,
  update,
  create,
  destroy,
};
