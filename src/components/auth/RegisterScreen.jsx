import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { uiRemoveErrorMessage, uiSetErrorMessage } from '../../actions/ui';
import { ALREADY_REGISTER, REGISTER } from '../../common/constants';
import {
  messageErrorEmail,
  messageErrorName,
  messageErrorPassword,
} from '../../common/errorMessage';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { messageError } = useSelector(({ ui }) => ui);

  // TODO remove this init state
  // name: "Lucas the duck",
  // email: "lucas.duck@gmail.com",
  // password: "123Lucas@",
  // confirmPassword: "123Lucas@",

  const { values, handleInputChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = values;

  const handleRegister = (e) => {
    e.preventDefault();

    isFormValid() &&
      dispatch(startRegisterWithEmailPasswordName({ email, password, name }));
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(uiSetErrorMessage(messageErrorName));
      return false;
    }

    if (!isEmail(email)) {
      dispatch(uiSetErrorMessage(messageErrorEmail));
      return false;
    }

    if (
      password.trim() !== confirmPassword.trim() ||
      (!isStrongPassword(password) && !isStrongPassword(confirmPassword))
    ) {
      dispatch(uiSetErrorMessage(messageErrorPassword));
      return false;
    }

    messageError && dispatch(uiRemoveErrorMessage());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">{REGISTER}</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate_faster"
      >
        {messageError && (
          <div className="auth__alert-error">{messageError}</div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          autoComplete="off"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="auth__input"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          {REGISTER}
        </button>

        <Link to="/auth/login" className="link mt-5">
          {ALREADY_REGISTER}
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
