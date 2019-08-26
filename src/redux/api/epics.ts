import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  // switchMap,
  mergeMap,
  takeUntil,
  retryWhen,
  map,
  startWith,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
// import * as TYPES from './types';
// import {
//   getHomeDataSuccess,
//   getHomeDataLoading,
//   getHomeDataError,
// } from './actions';

import qs from 'query-string';
import * as TYPE from './types';
import { showSpinner, hideSpinner } from '../ui/actions';
import { onErrorApi } from '../error/actions';
import { retryStrategy, headers, headersJson } from './helpers';

// export const getAjaxRequestEpic = (action$: any) =>
//   action$.ofType(TYPE.GET_AJAX_REQUEST_EPIC).mergeMap((action: any) => {
//     const { url, onSuccess, onCancel, body } = action.payload;
//     const inlineQuery = body === null ? '' : `?${qs.stringify(body)}`;
//     return ajax
//       .get(`${url}${inlineQuery}`, headersJson)
//       .retryWhen(retryStrategy)
//       .mergeMap(result => [onSuccess(result.response)])
//       .catch(err => [onErrorApi(err), hideSpinner()])
//       .startWith(showSpinner())
//       .takeUntil(action$.ofType(onCancel));
//   });

export const getAjaxRequestEpic = (action$: any) =>
  action$.pipe(
    ofType(TYPE.GET_AJAX_REQUEST_EPIC),
    mergeMap((action: any) => {
      const { url, onSuccess, onCancel, body } = action.payload;
      const inlineQuery = body === null ? '' : `?${qs.stringify(body)}`;
      return ajax.get(`${url}${inlineQuery}`, headersJson).pipe(
        retryWhen(retryStrategy),
        map(result => [onSuccess(result.response)]),
        takeUntil(action$.pipe(ofType(onCancel))),
        catchError(error => of([onErrorApi(error), hideSpinner()])),
        startWith(of(showSpinner())),
      );
    }),
  );

// export const patchAjaxRequestEpic = (action$: any) =>
//   action$.ofType(TYPE.PATCH_AJAX_REQUEST_EPIC).mergeMap((action: any) => {
//     const { url, onSuccess, onCancel, body } = action.payload;
//     return ajax
//       .patch(url, body, headersJson)
//       .retryWhen(retryStrategy)
//       .mergeMap(result => [onSuccess(result.response)])
//       .catch(err => [onErrorApi(err), hideSpinner()])
//       .startWith(showSpinner())
//       .takeUntil(action$.ofType(onCancel));
//   });

// export const postAjaxRequestEpic = (action$: any) =>
//   action$.ofType(TYPE.POST_AJAX_REQUEST_EPIC).mergeMap((action: any) => {
//     const { url, onSuccess, onCancel, body } = action.payload;
//     return ajax
//       .post(url, body, headersJson)
//       .retryWhen(retryStrategy)
//       .mergeMap(result => [onSuccess(result.response)])
//       .catch(err => [onErrorApi(err), hideSpinner()])
//       .startWith(showSpinner())
//       .takeUntil(action$.ofType(onCancel));
//   });

// export const putAjaxRequestEpic = (action$: any) =>
//   action$.ofType(TYPE.PUT_AJAX_REQUEST_EPIC).mergeMap((action: any) => {
//     const { url, onSuccess, onCancel, body } = action.payload;
//     return ajax
//       .post(url, body, headersJson)
//       .retryWhen(retryStrategy)
//       .mergeMap(result => [onSuccess(result.response)])
//       .catch(err => [onErrorApi(err), hideSpinner()])
//       .startWith(showSpinner())
//       .takeUntil(action$.ofType(onCancel));
//   });
// export const deleteAjaxRequestEpic = (action$: any) =>
//   action$.ofType(TYPE.PUT_AJAX_REQUEST_EPIC).mergeMap((action: any) => {
//     const { url, onSuccess, onCancel, body } = action.payload;
//     return ajax
//       .delete(`${url}?${qs.stringify(body)}`, headers)
//       .retryWhen(retryStrategy)
//       .mergeMap(result => [onSuccess(result.response)])
//       .catch(err => [onErrorApi(err), hideSpinner()])
//       .startWith(showSpinner())
//       .takeUntil(action$.ofType(onCancel));
//   });

export default [
  getAjaxRequestEpic,
  // patchAjaxRequestEpic,
  // postAjaxRequestEpic,
  // putAjaxRequestEpic,
  // deleteAjaxRequestEpic,
];
