import { FlightInfo } from './interface';
import { headers, url } from '../../../redux/helpers';

export const predefinedFlights: FlightInfo[] = [
  {
    id: 'sinkul',
    from: 'SIN-sky',
    to: 'KUL-sky',
    title: 'SIN-KUL',
  },
  {
    id: 'kulsin',
    from: 'KUL-sky',
    to: 'SIN-sky',
    title: 'KUL-SIN',
  },
  {
    id: 'kulsfo',
    from: 'KUL-sky',
    to: 'SFO-sky',
    title: 'KUL-SFO',
  },
];

export const DateFormat: string = 'YYYY-MM-DD';
export const UpdatesPending: string = 'UpdatesPending';
export const UpdatesComplete: string = 'UpdatesComplete';

export const blankFlightCard = {
  id: 0,
  agentImageUrl: '',
  agentName: '',
  price: 0,
  deeplinkUrl: '',
};

export const getOptionCreateSession = (
  dateRangeItem: string,
  flightInfo: FlightInfo,
) => {
  return {
    method: 'POST',
    url: url.createSession,
    headers,
    form: {
      inboundDate: dateRangeItem,
      country: 'US',
      currency: 'USD',
      locale: 'en-US',
      originPlace: flightInfo.from,
      destinationPlace: flightInfo.to,
      outboundDate: dateRangeItem,
      adults: 1,
    },
  };
};
