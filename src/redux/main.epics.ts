import { combineEpics } from 'redux-observable';
import api from './api/epics';
import home from './home/epics';

const rootEpic = combineEpics<any>(...api, ...home);

export default rootEpic;
