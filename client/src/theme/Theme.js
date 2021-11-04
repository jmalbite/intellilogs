import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },

    secondary: {
      main: '#52A240',
    },
  },

  typography: {
    fontFamily: 'Quicksand',
  },
  ...createTheme,
});

export default theme;
