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

const update = async event => {
  try {
    const response = await httpClient.put(eventUrl(event.id), {data: event});

    return [response.data.data, null];
  } catch (error) {
    return [null, error.response.data.errors];
  }
};

const create = async event => {
  try {
    const response = await httpClient.post(eventsUrl, {data: event});

    return [response.data.data, null];
  } catch (error) {
    return [null, error.response.data.errors];
  }
};

export default {
  index,
  update,
  create,
};
