import * as React from 'react';
import Button from 'antd/lib/button';

const Home = () => {
  const [status, setStatus] = React.useState(false);
  const handleToggleStatus = () => setStatus(!status);
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleToggleStatus}>Toggle Status</Button>
      <br />
      <p>{status ? 'True' : 'False'}</p>
    </div>
  );
};

export default Home;
