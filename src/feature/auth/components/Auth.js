import React, { Fragment, useEffect, useState, useRef } from 'react';

const Auth = (props) => {
  const { auth, authStart } = props;

  const [title, setTitle] = useState('');
  const bodyRef = useRef();

  useEffect(() => {
    authStart();
  }, [authStart]);

  if (auth.loading) {
    return <div>loading</div>;
  } else if (auth.error) {
    return <div>{auth.error}</div>;
  }

  const sendData = (event) => {
    event.preventDefault();
    console.log(`title: ${title}`);
    console.log(`body: ${bodyRef.current.value}`);
    setTitle('');
    bodyRef.current.value = '';
  };

  return (
    <Fragment>
      <div>{auth.user.name}</div>
      <div>{auth.user.email}</div>
      <form onSubmit={sendData}>
        <div>
          <label htmlFor='title'>タイトル</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='body'>本文</label>
          <input id='body' type='text' ref={bodyRef} />
        </div>
        <button>送信</button>
      </form>
    </Fragment>
  );
};

export default Auth;
