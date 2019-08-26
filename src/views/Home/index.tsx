import * as React from 'react';
import request from 'request';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lodash from 'lodash';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import * as actions from '../../redux/home/actions';
import FlightCard from './components/FlightCard';
import ViewCalendar from './components/Calendar';
import { HomeProps, HomeState, FlightInfo } from './components/interface';
import {
  predefinedFlights,
  DateFormat,
  UpdatesPending,
  UpdatesComplete,
  blankFlightCard,
  getOptionCreateSession,
} from './components/constants';

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    defaultPredefinedFlight: 'sinkul',
    sessionKey: '',
    modalFlightVisible: false,
    flightInfo: predefinedFlights[0],
    dateRangeItem: moment().format(DateFormat),
  };

  componentWillReceiveProps(nextProps: any) {
    if (
      this.state.sessionKey === nextProps.pollSession.SessionKey &&
      nextProps.pollSession.Status === UpdatesPending
    ) {
      this.props.reduxAction.pollSessionEpic(this.state.sessionKey);
    }
  }

  setModalFlightVisible = (modalFlightVisible: boolean) => {
    this.setState({ modalFlightVisible });
  };

  handleViewFlight = (selectedDate: any) => (e: any) => {
    e.preventDefault();

    const flightInfo: FlightInfo | undefined = predefinedFlights.find(
      f => f.id === this.state.defaultPredefinedFlight,
    );

    if (flightInfo) {
      const dateRangeItem = moment(selectedDate).format(DateFormat);
      this.setState({
        flightInfo,
        dateRangeItem,
        modalFlightVisible: true,
      });

      let options = getOptionCreateSession(dateRangeItem, flightInfo);

      request(options, (error, response) => {
        if (error) throw new Error(error);
        const split = lodash.get(response, 'headers.location').split('/');
        const sessionKey: string = lodash.last(split) || '';
        this.setState({ sessionKey });
        this.props.reduxAction.pollSessionEpic(sessionKey);
      });
    }
  };

  dateCellRender = (value: any) => {
    const from = moment().subtract(1, 'days');
    const to = moment().add(30, 'days');

    return (
      value >= from &&
      value <= to && (
        <Button
          onClick={this.handleViewFlight(value)}
          type="primary"
          shape="round"
          icon="schedule"
          size="small"
        >
          View Flights
        </Button>
      )
    );
  };

  handleFlightChange = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      defaultPredefinedFlight: value,
    });
  };

  handleFlightModalClose = () => {
    this.props.reduxAction.pollSessionClearData();
    this.setModalFlightVisible(false);
  };

  render() {
    const { defaultPredefinedFlight, flightInfo, dateRangeItem } = this.state;
    const { pollSession, dataSource } = this.props;
    return (
      <section>
        <h1>Skyscanner Flight Search</h1>
        <Radio.Group
          value={defaultPredefinedFlight}
          onChange={this.handleFlightChange}
        >
          <Radio.Button value="sinkul">SIN-KUL</Radio.Button>
          <Radio.Button value="kulsin">KUL-SIN</Radio.Button>
          <Radio.Button value="kulsfo">KUL-SFO</Radio.Button>
        </Radio.Group>

        <ViewCalendar dateCellRender={this.dateCellRender} />

        <Modal
          title="Flight Prices"
          style={{ top: 20 }}
          width={350}
          maskClosable={false}
          visible={this.state.modalFlightVisible}
          onOk={this.handleFlightModalClose}
          onCancel={this.handleFlightModalClose}
        >
          <h1>{flightInfo.title}</h1>
          <h4>Date Selected: {dateRangeItem}</h4>
          {pollSession.Status !== UpdatesComplete && (
            <FlightCard
              key={0}
              status={UpdatesPending}
              data={blankFlightCard}
            />
          )}
          {lodash.map(dataSource, (data, index) => {
            return (
              <FlightCard key={index} status={pollSession.Status} data={data} />
            );
          })}
        </Modal>
      </section>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isLoading: state.ui.isLoading,
    pollSession: state.home.pollSession,
    dataSource: state.home.dataSource,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    reduxAction: bindActionCreators({ ...actions }, dispatch),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
