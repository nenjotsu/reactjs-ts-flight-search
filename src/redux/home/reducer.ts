import { handleActions } from 'redux-actions';
import * as lodash from 'lodash';
import {
  getHomeDataSuccess,
  getHomeDataError,
  getHomeDataLoading,
  createSessionSuccess,
  pollSessionSuccess,
  pollSessionClearData,
} from './actions';
import Model from './model';

interface HomeReducer {
  homeData: object;
  loading: boolean;
}

interface CreateSession {
  date: string;
  records: any[];
}

interface Payload {
  payload: CreateSession | any;
}

const getAction = (action: any) => {
  return action.toString();
};

const mapDataSource = (records: any) => {
  const itineraries = lodash.get(records, 'Itineraries');
  const agents = lodash.get(records, 'Agents');
  const query = lodash.get(records, 'Query');
  const mapItineraries = lodash.map(itineraries, itenerary => {
    const pricingOptions = lodash.get(itenerary, 'PricingOptions[0]');
    const agentId = lodash.get(pricingOptions, 'Agents[0]');
    const agent = lodash.find(agents, agenct => agenct.Id === agentId);
    return {
      id: agent.Id,
      price: pricingOptions.Price,
      agentName: agent.Name,
      agentImageUrl: agent.ImageUrl,
      currency: query.Currency,
      adults: query.Adults,
      quoteAgeInMinutes: pricingOptions.QuoteAgeInMinutes,
      deeplinkUrl: pricingOptions.DeeplinkUrl,
    };
  });

  const sortByPrices = lodash.sortBy(mapItineraries, ['price']);

  return sortByPrices;
};

export default handleActions<HomeReducer, Payload>(
  {
    [getAction(getHomeDataSuccess)]: (state: object, action: any) => ({
      ...state,
      homeData: action.payload,
      loading: false,
    }),
    [getAction(getHomeDataLoading)]: state => ({
      ...state,
      loading: true,
    }),
    [getAction(getHomeDataError)]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
    [getAction(createSessionSuccess)]: (state, action: Payload) => ({
      ...state,
      createSession: {
        [`${action.payload.date}`]: action.payload.records,
      },
    }),
    [getAction(pollSessionSuccess)]: (state, action: Payload) => ({
      ...state,
      pollSession: action.payload,
      dataSource:
        action.payload.Status === 'UpdatesComplete'
          ? mapDataSource(action.payload)
          : [],
    }),
    [getAction(pollSessionClearData)]: state => ({
      ...state,
      pollSession: {},
      dataSource: [],
    }),
  },
  Model,
);
