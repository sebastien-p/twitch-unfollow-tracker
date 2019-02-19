import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import { User, State } from '../redux/store';
import { login } from '../redux/thunks';
import { Field } from './Field';
import { Form } from './Form';

export type FormValues = Pick<NonNullable<User>, 'clientId' | 'name'>;

type Props = {
  user: User;
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
    const { user, login } = this.props;

    return user ? <Redirect to='/'/> : (
      <Form
        initialValues={user || this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={login}>
        <Field name='clientId'>Client ID</Field>
        <Field name='name'>User name</Field>
      </Form>
    );
  }
}
export const Login = connect<
  Pick<Props, 'user'>,
  Pick<Props, 'login'>,
  {},
  State
>(
  ({ user }) => ({ user }), // DRY
  { login }
)(PureLogin);
