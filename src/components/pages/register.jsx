import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import s from '../../sass/utils/register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';
import { authOperations } from '../../redux/auth';
import { errorSelectors } from '../../redux/error';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be an email address')
    .min(8, 'Too short!')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /[A-Z]\w+/,
      'Only Latin letters are allowed. At list one Uppercase is required.',
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match',
  ),
});

const createErrorMessage = error => {
  console.log('createErrorMessage', error);
  if (error.includes('401')) return '';
  if (error.includes('400')) return 'Not valid password';
  if (error.includes('409')) return 'Provided email already exists';
  return 'Unknown error. Please try again';
};

const Register = () => {
  const dispatch = useDispatch();

  const sendData = useCallback(
    (email, password) => dispatch(authOperations.register({ email, password })),
    [dispatch],
  );

  const errorFromState = useSelector(errorSelectors);

  const errorMessage = errorFromState
    ? createErrorMessage(errorFromState)
    : null;

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const { email, password } = values;
          sendData(email, password);
        }}
        autoComplete="on"
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <form
            name="signupForm"
            autoComplete="on"
            className={s.registerForm}
            onSubmit={handleSubmit}
          >
            <h1 className={s.registerTitle}>Registration</h1>
            <div className={s.formGroup}>
              <div className={s.formField}>
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    touched.email && errors.email ? s.inputError : s.inputForm
                  }
                />
                <label className={s.formLabel}>E-mail</label>
                <Error touched={touched.email} message={errors.email} />
              </div>
              <div className={s.formField}>
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    touched.password && errors.password
                      ? s.inputError
                      : s.inputForm
                  }
                />
                <label className={s.formLabel}>Password</label>
                <Error touched={touched.password} message={errors.password} />
              </div>
              <div className={s.formField}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={
                    touched.confirmPassword && errors.confirmPassword
                      ? s.inputError
                      : s.inputForm
                  }
                />
                <label className={s.formLabel}>Repeat password</label>
                <Error
                  touched={touched.confirmPassword}
                  message={errors.confirmPassword}
                />
              </div>
            </div>
            <div className={s.regFormBtn}>
              {errorMessage ? (
                <div className={s.errorMessage}>{errorMessage}</div>
              ) : null}
              <button
                type="submit"
                className={s.formBtn}
                disabled={isSubmitting}
              >
                Register
              </button>
              <div className={s.toLogin}>
                Do you have an account?
                <Link to="/login" className={s.regSpan}>
                  Log in
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
