import React, { FunctionComponent } from 'react';
import { ObjectSchema, object, string } from 'yup';
import { connect } from 'react-redux';

import { State } from '../redux/store';
import { login } from '../redux/thunks';
import { Field } from './Field';
import { Form } from './Form';

export type Values = Pick<NonNullable<State['user']>, 'clientId' | 'name'>;

type DispatchProps = {
  login(form: Values): void;
};

type Props = DispatchProps;

const initialValues: Values = {
  clientId: '',
  name: ''
};

const validationSchema: ObjectSchema<Values> = object<Values>({
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
