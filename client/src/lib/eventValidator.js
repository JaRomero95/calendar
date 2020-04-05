import intl from 'i18n/intl';
import moment from 'moment';

function validate(event) {
  let errors = {};

  errors = validateTitle(event, errors);
  errors = validateEndDate(event, errors);

  return errors;
}

function validateTitle({title}, errors) {
  if (!title || title.length === 0) {
    return {
      ...errors,
      title: intl.formatMessage({id: 'general.errors.blank'}),
    };
  }

  const maxLength = 60;
  if (title.length > maxLength) {
    return {
      ...errors,
      title: intl.formatMessage({id: 'general.errors.tooLong'}, {value: maxLength}),
    };
  }

  return errors;
}

function validateEndDate({start_date: startDate, end_date: endDate}, errors) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  if (endMoment.isBefore(startMoment)) {
    return {
      ...errors,
      end_date: intl.formatMessage({id: 'general.errors.endDateLessThanStartDate'}),
    };
  }

  return errors;
}

export default {
  validate,
};
