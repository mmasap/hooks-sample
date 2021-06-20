import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_START } from '../../../constants/ActionTypes';

const Auth = (props) => {
  const { auth, authStart } = props;

  const authHook = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dispatchAuthStart = useCallback(
    () => dispatch({ type: AUTH_START }),
    [dispatch]
  );

  const [title, setTitle] = useState('');
  const bodyRef = useRef();

  // useEffect(() => {
  //   authStart();
  // }, [authStart]);

  useEffect(() => {
    dispatchAuthStart();
  }, [dispatchAuthStart]);

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
      <div style={{ marginBottom: 10 }}>
        <div>props</div>
        <div>{auth.user.name}</div>
        <div>{auth.user.email}</div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <div>useSelector</div>
        <div>{authHook.user.name}</div>
        <div>{authHook.user.email}</div>
      </div>
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
