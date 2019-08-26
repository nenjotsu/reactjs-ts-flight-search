import * as TYPE from './types';

const onErrorApi = ({ dispatch }: any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === TYPE.ON_ERROR_API) {
    console.error('error', action.payload, dispatch);
  }
};

export default [onErrorApi];
