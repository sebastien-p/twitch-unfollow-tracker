import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { ObjectSchema, object, string } from 'yup';

import { login } from '../redux/thunks';
import { State } from '../redux/store';
import { Field } from './Field';
import { Form } from './Form';

export type LoginForm = Pick<NonNullable<State['user']>, 'clientId' | 'name'>;

type DispatchProps = {
  login(form: LoginForm): void;
};

type Props = DispatchProps;

const initialValues: LoginForm = {
  clientId: '',
  name: ''
};

const validationSchema: ObjectSchema<LoginForm> = object<LoginForm>({
  clientId: string().required(),
  name: string().required()
}).strict(true);

const PureLogin: FunctionComponent<Props> = ({ login }) => (
  <Form
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={login}>
    <Field name='clientId'>Client ID</Field>
    <Field name='name'>User name</Field>
  </Form>
);

export const Login = connect<{}, DispatchProps, {}, State>(
  null,
  { login }
)(PureLogin);
