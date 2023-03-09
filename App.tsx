import React from 'react';
import AppContainer from './src/components/app-container';
import Navigator from './src/';
import StoreProvider from './src/redux/store-provider';

export default function App() {
  return (
    <StoreProvider>
      <AppContainer>
        <Navigator />
      </AppContainer>
    </StoreProvider>
  );
}
