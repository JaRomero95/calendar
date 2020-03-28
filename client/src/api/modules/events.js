import httpClient from '../httpClient';

const eventUrl = '/events';
// const eventsUrl = id => `${eventUrl}/${id}`;

const index = async ({startDateFrom, startDateUntil}) => {
  const params = {
    start_date_from: startDateFrom,
    start_date_until: startDateUntil,
  };

  const response = await httpClient.get(eventUrl, {params});

  return response.data;
};

export default {
  index,
};
