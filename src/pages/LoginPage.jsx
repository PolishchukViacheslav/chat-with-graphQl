import React from 'react';
import { AppMenu } from '../components/AppMenu';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

export const LoginPage = () => (
  <AppMenu greeting="Welcome">
    <SignUp />
    <SignIn />
  </AppMenu>
);
