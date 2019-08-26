export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const domain = 'https://jsonplaceholder.typicode.com';
const flightSearchDomain =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';

export const url = {
  posts: `${domain}/posts`,
  comments: `${domain}/comments`,
  createSession: `${flightSearchDomain}/v1.0`,
  pollSession: (sessionkey: string) =>
    `${flightSearchDomain}/uk2/v1.0/${sessionkey}?pageIndex=0&pageSize=10`,
};

export const multiDispatch = ({ dispatch }: any) => (next: any) => (
  action: any,
) => {
  if (Array.isArray(action)) {
    return action.filter(Boolean).map(dispatch);
  }
  return next(action);
};

export const retryStrategy = (errors: any) =>
  errors
    .scan((_: any, value: number, index: number) => {
      if (index < 2) {
        return index;
      }
      throw value;
    })
    .delay(5000);

export const headersJson = {
  'Content-Type': 'application/json',
  'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  'x-rapidapi-key': '58ZJm7qOgEmsh2dIqPpoXtpelIv2p1QVxRgjsngRKxYnw73Zok',
};

export const headers = {
  'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  'x-rapidapi-key': '58ZJm7qOgEmsh2dIqPpoXtpelIv2p1QVxRgjsngRKxYnw73Zok',
  'content-type': 'application/x-www-form-urlencoded',
};
