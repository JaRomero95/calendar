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

const update = event => handleRequestWithPayload('put', eventUrl(event.id), event);

const create = event => handleRequestWithPayload('post', eventsUrl, event);

const destroy = async eventId => {
  await httpClient.delete(eventUrl(eventId));
};

async function handleRequestWithPayload(httpMethod, url, data) {
  try {
    const response = await httpClient[httpMethod](url, {data});

    return [response.data.data, null];
  } catch (error) {
    if (error.response) {
      return [null, error.response.data.errors];
    }

    throw error;
  }
}

export default {
  index,
  update,
  create,
  destroy,
};
