import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SigIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <SignIn />
    <GlobalStyle />
  </>
);
export default App;
