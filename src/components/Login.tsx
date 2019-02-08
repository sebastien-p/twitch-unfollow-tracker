import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import { login } from '../redux/thunks';
import { User, State } from '../redux/store';
import { Field } from './Field';
import { Form } from './Form';

export type FormValues = Pick<NonNullable<User>, 'clientId' | 'name'>;

type Props = {
  isLoggedIn: boolean;
  login(formValues: FormValues): void;
};

class PureLogin extends Component<Props> {
  private readonly initialValues: FormValues = {
    clientId: '',
    name: ''
  };

  private validationSchema = object().strict(true).shape({
    clientId: string().required(),
    name: string().required()
  });

  render(): JSX.Element {
    const { isLoggedIn, login } = this.props;

    return isLoggedIn ? <Redirect to='/'/> : (
      <Form
        validationSchema={this.validationSchema}
        initialValues={this.initialValues}
        onSubmit={login}>
        <Field name='clientId'>Client ID</Field>
        <Field name='name'>User name</Field>
      </Form>
    );
  }
}
export const Login = connect<
  Pick<Props, 'isLoggedIn'>,
  Pick<Props, 'login'>,
  {},
  State
>(
  ({ user }) => ({ isLoggedIn: !!user }), // DRY
  { login }
)(PureLogin);
