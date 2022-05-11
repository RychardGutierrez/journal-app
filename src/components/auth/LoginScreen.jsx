import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { uiRemoveErrorMessage, uiSetErrorMessage } from '../../actions/ui';
import { messageErrorWrongEmailOrPassword } from '../../common/errorMessage';
import { LOGIN, SIGN_GOOGLE, CREATE_NEW_ACCOUNT } from '../../common/constants';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { messageError, loading } = useSelector(({ ui }) => ui);

  // TODO remove this init state
  // email: 'lucas@gmail.com',
  // password: '123Lucas@',
  const { values, handleInputChange } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    isFormValid() && dispatch(startLoginEmailPassword({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!isEmail(email)) {
      dispatch(uiSetErrorMessage(messageErrorWrongEmailOrPassword));
      return false;
    }

    if (password.trim().length === 0 || !isStrongPassword(password)) {
      dispatch(uiSetErrorMessage(messageErrorWrongEmailOrPassword));
      return false;
    }

    messageError && dispatch(uiRemoveErrorMessage());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">{LOGIN}</h3>
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate_faster"
      >
        {messageError && (
          <div className="auth__alert-error">{messageError}</div>
        )}

        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Loading'}
        </button>
        <hr />
        <div className="auth__social_networks ">
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>{SIGN_GOOGLE}</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          {CREATE_NEW_ACCOUNT}
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
