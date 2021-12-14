import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import VisitorPage from './pages/VisitorPage/VisitorPage';
import VisitorAppbar from './components/layout/VisitorAppbar';
import BorrowersPage from './pages/BorrowersPage/BorrowersPage';

import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <VisitorAppbar />
      <Router>
        {/* Nav Links Here */}
        <Routes>
          <Route path="/" element={<VisitorPage />} />
          <Route path="/borrowerslog" element={<BorrowersPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
