import { createAction } from 'redux-actions';
import * as TYPE from './types';
export const getHomeDataEpics = createAction(TYPE.GET_HOME_DATA_EPIC);
export const getHomeDataLoading = createAction(TYPE.GET_HOME_DATA_LOADING);
export const getHomeDataSuccess = createAction(TYPE.GET_HOME_DATA_SUCCESS);
export const getHomeDataError = createAction(TYPE.GET_HOME_DATA_ERROR);

export const createSessionEpic = createAction(TYPE.CREATE_SESSION_EPIC);
export const createSessionSuccess = createAction(TYPE.CREATE_SESSION_SUCCESS);
export const createSessionCancel = createAction(TYPE.CREATE_SESSION_CANCEL);
export const createSession = createAction(TYPE.CREATE_SESSION);
export const createSessionClearData = createAction(TYPE.CREATE_SESSION_CLEAR);

export const pollSessionEpic = createAction(TYPE.POLL_SESSION_EPIC);
export const pollSessionSuccess = createAction(TYPE.POLL_SESSION_SUCCESS);
export const pollSessionCancel = createAction(TYPE.POLL_SESSION_CANCEL);
export const pollSession = createAction(TYPE.POLL_SESSION);
export const pollSessionClearData = createAction(TYPE.POLL_SESSION_CLEAR);
