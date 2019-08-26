import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  mergeMap,
  takeUntil,
  retryWhen,
  map,
  startWith,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';

import qs from 'query-string';
import * as TYPE from './types';
import { showSpinner, hideSpinner } from '../ui/actions';
import { onErrorApi } from '../error/actions';
import { retryStrategy, headersJson } from './helpers';

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

export default [getAjaxRequestEpic];
