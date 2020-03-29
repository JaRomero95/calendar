import moment from 'moment';

const month = ({start, end}) => ({
  startDateFrom: moment(start).startOf('day'),
  startDateUntil: moment(end).endOf('day'),
});

const week = days => {
  const start = days[0];
  const end = days[days.length - 1];

  const startDateFrom = moment(start).startOf('day');
  const startDateUntil = moment(end).endOf('day');

  return {
    startDateFrom,
    startDateUntil,
  };
};

const day = days => week(days);

const agenda = payload => month(payload);

export default {
  month,
  week,
  day,
  agenda,
};
