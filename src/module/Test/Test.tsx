import * as React from 'react';
import { connect } from 'react-redux';
import { getHomeDataEpics } from '../../store/home/actions';

interface TestProps {
  getHomeDataEpics: () => void;
}

interface TestState {
  status: boolean;
}

class Test extends React.Component<TestProps, TestState> {
  state = {
    status: false,
  };

  componentDidMount() {
    this.setState({
      status: true,
    });
  }

  handleChangeStatus = () => {
    this.setState(prevState => ({
      status: !prevState.status,
    }));
  };

  onGetBlog = () => {
    this.props.getHomeDataEpics();
  };

  render() {
    return (
      <div>
        <h1>Test component</h1>
        {this.state.status ? 'im true' : 'im false'}
        <button onClick={this.onGetBlog}>get blog</button>
        <button onClick={this.handleChangeStatus}>Change status</button>
      </div>
    );
  }
}

export default connect(
  null,
  { getHomeDataEpics },
)(Test);
