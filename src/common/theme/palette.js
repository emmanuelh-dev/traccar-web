import { grey, green, indigo } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? grey[900] : grey[50],
  },
  primary: {
    main: validatedColor(server?.attributes?.colorPrimary) || (darkMode ? "#0F52BA" : "#0F52BA"),
  },
  background: {
    main: (darkMode ? "#e0e9f9" : "#e0e9f9"),
  },
  secondary: {
    main: validatedColor(server?.attributes?.colorSecondary) || (darkMode ? "#0F52BA" : "#0F52BA"),
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#3bb2d0',
  },
});
