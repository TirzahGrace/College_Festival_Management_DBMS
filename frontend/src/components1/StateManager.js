import React, { useState, useEffect }  from 'react';

function StateManager() {
  const [userId, setUserId] = useState('default');
  const [loginView, setLoginView] = useState(0);
  return ({ userId, setUserId, loginView, setLoginView })
};
export default StateManager;