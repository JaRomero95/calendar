import httpClient from '../httpClient';

const eventUrl = '/events';
// const eventsUrl = id => `${eventUrl}/${id}`;

const index = async ({startDateFrom, startDateUntil}) => {
  const params = {
    'filter[start_date_from]': startDateFrom.toJSON(),
    'filter[start_date_until]': startDateUntil.toJSON(),
  };

  const response = await httpClient.get(eventUrl, {params});

  return response.data.data;
};

export default {
  index,
};
