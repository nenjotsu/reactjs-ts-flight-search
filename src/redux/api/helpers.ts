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
  'Content-Type': 'application/json',
};
