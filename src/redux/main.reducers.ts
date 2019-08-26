import { combineReducers } from 'redux';
import home from './home/reducer';
import ui from './ui/reducers';

const rootReducers = combineReducers({
  home,
  ui,
} as any);

export default rootReducers;
