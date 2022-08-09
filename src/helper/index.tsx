import moment from 'moment';

export const trackDuration = (ms: number) => {
  return moment.utc(ms).format('mm');
};
