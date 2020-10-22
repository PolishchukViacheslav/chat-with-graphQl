import React from 'react';
import { AppMenu } from '../components/AppMenu';
import { LoginButton } from '../components/LoginButton';

export const LoginPage = () => (
  <AppMenu greeting="Welcome">
    <LoginButton />
  </AppMenu>
);
