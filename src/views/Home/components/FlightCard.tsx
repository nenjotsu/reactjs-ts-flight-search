import * as React from 'react';
import { Card, Icon, Avatar, Skeleton, Button } from 'antd';
import { UpdatesPending } from './constants';

const CardFooter = [
  <Icon type="star" key="favorites" />,
  <Icon type="carry-out" key="open" />,
  <Icon type="ellipsis" key="more" />,
];

const { Meta } = Card;

interface FlightCardPayload {
  key: number;
  status: string;
  data: {
    id: number;
    agentImageUrl: string;
    agentName: string;
    price: number;
    adults?: number;
    currency?: string;
    quoteAgeInMinutes?: number;
    deeplinkUrl: string;
  };
}

const style = {
  width: 300,
  marginTop: 16,
};

function openInNewTab(url: string) {
  var win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
}

const FlightCard = ({ key, status, data }: FlightCardPayload) => (
  <Card key={key} style={style} actions={CardFooter}>
    <Skeleton loading={status === UpdatesPending} avatar active>
      <Meta
        avatar={<Avatar src={data.agentImageUrl} />}
        title={`${data.id} - ${data.agentName}`}
        description={
          <div>
            <p>{`${data.currency} ${data.price}`}</p>
            <Button
              onClick={() => openInNewTab(data.deeplinkUrl)}
              type="primary"
            >
              View Details
            </Button>
          </div>
        }
      />
    </Skeleton>
  </Card>
);

export default FlightCard;
