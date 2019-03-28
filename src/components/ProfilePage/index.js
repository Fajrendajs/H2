import React from 'react';
import { Button } from 'antd';

function ProfilePage(props) {
  const showMessage = test => {
    alert('Hello ' + props.user + '/' + test);
  };

  const handleClick = () => {
    setTimeout(() => showMessage('green'), 3000);
  };
  return <Button onClick={handleClick}>Follow</Button>;
}

export default ProfilePage;
