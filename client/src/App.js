import React from 'react';
import VisitorPage from './pages/VisitorPage/VisitorPage';
import AddNewLog from './components/VisitorLogs/AddNewLog';

import Theme from './theme/Theme';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <VisitorPage>
          <AddNewLog />
        </VisitorPage>
      </div>
    </ThemeProvider>
  );
};

export default App;
