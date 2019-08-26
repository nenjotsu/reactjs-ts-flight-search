import * as React from 'react';
import moment from 'moment';
import Calendar from 'antd/lib/calendar';

const ViewCalendar = ({ dateCellRender }: any) => (
  <Calendar
    disabledDate={date => date <= moment().subtract(1, 'days')}
    validRange={[moment().subtract(1, 'days'), moment().add(1, 'months')]}
    dateCellRender={dateCellRender}
  />
);

export default ViewCalendar;
