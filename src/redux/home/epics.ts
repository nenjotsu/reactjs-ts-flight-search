import { ofType } from 'redux-observable';
import request from 'request';
import { ajax } from 'rxjs/ajax';
import {
  switchMap,
  mergeMap,
  takeUntil,
  map,
  startWith,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPES from './types';
import * as ACTION from './actions';
import { showSpinner, hideSpinner } from '../ui/actions';
import { onErrorApi } from '../error/actions';
import { retryStrategy, headers, headersJson, url } from '../helpers';

export const getHomeDataEpic = (action$: any) =>
  action$.pipe(
    ofType(TYPES.GET_HOME_DATA_EPIC),
    switchMap(() =>
      ajax('https://www.metaweather.com/api/location/search/?query=san').pipe(
        map(result => ACTION.getHomeDataSuccess(result.response)),
        takeUntil(action$.pipe(ofType(TYPES.GET_HOME_DATA_CANCEL))),
        catchError(error => of(ACTION.getHomeDataError(error))),
        startWith(ACTION.getHomeDataLoading('1')),
      ),
    ),
  );

interface CreatePayload {
  payload: {
    date: string;
    originPlace: string;
    destinationPlace: string;
  };
}

export const createSessionEpic = (action$: any) =>
  action$.pipe(
    ofType(TYPES.CREATE_SESSION_EPIC),
    map(
      (action: CreatePayload) => {
        var options = {
          method: 'POST',
          url: url.createSession,
          headers,
          form: {
            inboundDate: action.payload.date,
            country: 'US',
            currency: 'USD',
            locale: 'en-US',
            originPlace: action.payload.originPlace,
            destinationPlace: action.payload.destinationPlace,
            outboundDate: action.payload.date,
            adults: 1,
          },
        };

        return request(options, (error, response, body) => {
          console.log('body', body);
          console.log('response', response);
          if (error) throw new Error(error);
          return [
            ACTION.createSessionSuccess({
              date: action.payload.date,
              records: response,
            }),
          ];
        });
      },
      // fetch(url.createSession, {
      //   method: 'POST',
      //   headers: {
      //     'x-rapidapi-host':
      //       'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      //     'x-rapidapi-key':
      //       '58ZJm7qOgEmsh2dIqPpoXtpelIv2p1QVxRgjsngRKxYnw73Zok',
      //     'content-type': 'application/x-www-form-urlencoded',
      //   },
      //   body: {
      //     inboundDate: action.payload.date,
      //     country: 'US',
      //     currency: 'USD',
      //     locale: 'en-US',
      //     originPlace: action.payload.originPlace,
      //     destinationPlace: action.payload.destinationPlace,
      //     outboundDate: action.payload.date,
      //     adults: 1,
      //   },
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   }),
      // ajax
      //   .post(
      //     url.createSession,
      //     {
      //       inboundDate: action.payload.date,
      //       country: 'US',
      //       currency: 'USD',
      //       locale: 'en-US',
      //       originPlace: action.payload.originPlace,
      //       destinationPlace: action.payload.destinationPlace,
      //       outboundDate: action.payload.date,
      //       adults: 1,
      //     },
      //     headers,
      //   )
      //   .pipe(
      //     map((result: any) =>
      //       ACTION.createSessionSuccess({
      //         date: action.payload.date,
      //         records: result.getAllResponseHeaders(),
      //       }),
      //     ),
      //     takeUntil(action$.pipe(ofType(TYPES.GET_HOME_DATA_CANCEL))),
      //     catchError(error => of(onErrorApi(error))),
      //     startWith(showSpinner()),
      //   ),
    ),
  );

// export const createSessionEpic = (action$: any) =>
//   action$.pipe(
//     ofType(TYPES.CREATE_SESSION_EPIC),
//     mergeMap((action: CreatePayload) =>
//       ajax
//         .post(
//           url.createSession,
//           {
//             inboundDate: action.payload.date,
//             country: 'US',
//             currency: 'USD',
//             locale: 'en-US',
//             originPlace: action.payload.originPlace,
//             destinationPlace: action.payload.destinationPlace,
//             outboundDate: action.payload.date,
//             adults: 1,
//           },
//           headers,
//         )
//         .pipe(
//           map((result: any) =>
//             ACTION.createSessionSuccess({
//               date: action.payload.date,
//               records: result.getAllResponseHeaders(),
//             }),
//           ),
//           takeUntil(action$.pipe(ofType(TYPES.GET_HOME_DATA_CANCEL))),
//           catchError(error => of(onErrorApi(error))),
//           startWith(showSpinner()),
//         ),
//     ),
//   );

export const pollSessionEpic = (action$: any) =>
  action$.pipe(
    ofType(TYPES.POLL_SESSION_EPIC),
    switchMap((action: any) =>
      ajax.get(url.pollSession(action.payload), headersJson).pipe(
        map(result => ACTION.pollSessionSuccess(result.response)),
        takeUntil(action$.pipe(ofType(TYPES.POLL_SESSION_CANCEL))),
        catchError(error => of(onErrorApi(error))),
        startWith(showSpinner()),
      ),
    ),
  );

export default [getHomeDataEpic, createSessionEpic, pollSessionEpic];
