import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SigIn';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};
export default App;
