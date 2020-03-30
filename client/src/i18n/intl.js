import {createIntl, createIntlCache} from 'react-intl';
import messages from './locales/en.json';

const cache = createIntlCache();

const intl = createIntl({
  locale: 'en',
  messages,
}, cache);

export default intl;
