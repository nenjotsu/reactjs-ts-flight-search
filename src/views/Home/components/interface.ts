export interface ReduxAction {
  createSessionEpic: Function;
  pollSessionEpic: Function;
  pollSessionClearData: Function;
}

export interface HomeProps {
  reduxAction: ReduxAction;
  pollSession: any;
  dataSource: any[];
}

export interface FlightInfo {
  id: string;
  from: string;
  to: string;
  title: string;
}

export interface HomeState {
  defaultPredefinedFlight: string;
  sessionKey: string;
  modalFlightVisible: boolean;
  flightInfo: FlightInfo;
  dateRangeItem: string;
}
