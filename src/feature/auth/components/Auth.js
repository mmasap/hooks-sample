import React, { Fragment, useEffect } from 'react';

const Auth = ({ authStart, auth }) => {
  useEffect(() => {
    authStart();
  }, [authStart]);

  if (auth.loading) {
    return <div>loading</div>;
  } else if (auth.error) {
    return <div>{auth.error}</div>;
  }

  return (
    <Fragment>
      <div>{auth.user.name}</div>
      <div>{auth.user.email}</div>
    </Fragment>
  );
};

export default Auth;
