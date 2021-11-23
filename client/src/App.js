import React from 'react';
import VisitorPage from './pages/VisitorPage/VisitorPage';
import AddNewLog from './components/VisitorLogs/AddNewLog';
import VisitorAppbar from './components/layout/VisitorAppbar';

import Theme from './theme/Theme';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <VisitorAppbar />
        <VisitorPage>
          <AddNewLog />
        </VisitorPage>
      </div>
    </ThemeProvider>
  );
};

export default App;
