import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  switchMap,
  takeUntil,
  map,
  startWith,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPES from './types';
import * as ACTION from './actions';
import { showSpinner } from '../ui/actions';
import { onErrorApi } from '../error/actions';
import { headersJson, url } from '../helpers';

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

export default [pollSessionEpic];
