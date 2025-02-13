import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { CiViewTable } from 'react-icons/ci';
import {
  Checkbox,
  CircularProgress,
  FormLabel,
  IconButton,
  Paper,
  Slider,
  Toolbar,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';
import MapView from '../map/core/MapView';
import MapRoutePath from '../map/MapRoutePath';
import MapRoutePoints from '../map/MapRoutePoints';
import MapPositions from '../map/MapPositions';
import { formatDistance, formatTime } from '../common/util/formatter';
import ReportFilter from '../reports/components/ReportFilter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useCatch } from '../reactHelper';
import MapCamera from '../map/MapCamera';
import MapGeofence from '../map/MapGeofence';
import StatusCard from '../common/components/StatusCard';
import {
  useAttributePreference,
  usePreference,
} from '../common/util/preferences';
import PositionValue from '../common/components/PositionValue';
import { Close, Tune } from '@mui/icons-material';
import PDFDownloadButton from '../reports/PDFDownloadButton.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 3,
    left: 0,
    top: 0,
    margin: theme.spacing(1.5),
    width: theme.dimensions.drawerWidthDesktop,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  slider: {
    width: '100%',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControlLabel: {
    height: '100%',
    width: '100%',
    paddingRight: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  icon: {
    height: '20px',
  },
  table: {
    overflow: 'auto',
    maxHeight: '600px',
    scrollbarWidth: 'thin',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: '0.1em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },

    fontSize: '10px',
  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ReplayPage = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const t = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const timerRef = useRef();

  const hours12 = usePreference('twelveHourFormat');

  const defaultDeviceId = useSelector((state) => state.devices.selectedId);

  const [positions, setPositions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState(defaultDeviceId);
  const [showCard, setShowCard] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [expanded, setExpanded] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showTable, setShowTable] = useState(desktop ? true : false);
  const distanceUnit = useAttributePreference('distanceUnit');
  const tableRef = useRef(null);

  const deviceName = useSelector((state) => {
    if (selectedDeviceId) {
      const device = state.devices.items[selectedDeviceId];
      if (device) {
        return device.name;
      }
    }
    return null;
  });

  useEffect(() => {
    if (playing && positions.length > 0) {
      timerRef.current = setInterval(() => {
        setIndex((index) => index + 1);
      }, 500);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [playing, positions]);

  useEffect(() => {
    if (index >= positions.length - 1) {
      clearInterval(timerRef.current);
      setPlaying(false);
    }
  }, [index, positions]);

  const onPointClick = useCallback(
    (_, index) => {
      setIndex(index);
    },
    [setIndex]
  );

  const onMarkerClick = useCallback(
    (positionId) => {
      setShowCard(!!positionId);
    },
    [setShowCard]
  );

  useEffect(() => {
    if (tableRef.current && showTable) {
      const tableRows = tableRef.current.querySelectorAll('tr');
      if (tableRows && tableRows[index]) {
        tableRows[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [index, showTable]);

  function filterPositions(positions) {
    return positions.filter((position, index) => {
      const { speed, attributes } = position;

      if (speed === 0) {
        if (attributes?.bleTemp1 !== undefined) {
          const currentTemp = Math.round(attributes.bleTemp1);
          const prevTemp =
            index > 0
              ? Math.round(positions[index - 1]?.attributes?.bleTemp1 || NaN)
              : NaN;
          if (currentTemp !== prevTemp) return true;
        }

        return index === 0 || index === positions.length - 1;
      }

      return true;
    });
  }


  const handleSubmit = useCatch(async ({ deviceId, from, to }) => {
    setSearching(true);
    setSelectedDeviceId(deviceId);
    setFrom(from);
    setTo(to);
    const query = new URLSearchParams({ deviceId, from, to });
    const response = await fetch(`/api/positions?${query.toString()}`);
    if (response.ok) {
      setIndex(0);
      const positions = await response.json();
      const filteredPositions = filterPositions(positions);
      if (filteredPositions.length > 0) {
        setPositions(filteredPositions);
        setSearching(false);
      } else {
        setSearching(false);
        throw Error(t('sharedNoData'));
      }
      if (positions.length) {
        setExpanded(false);
      } else {
        throw Error(t('sharedNoData'));
      }
    } else {
      throw Error(await response.text());
    }
  });

  const handleDownload = () => {
    const query = new URLSearchParams({ deviceId: selectedDeviceId, from, to });
    window.location.assign(`/api/positions/kml?${query.toString()}`);
  };
  return (
    <div className={classes.root}>
      <MapView>
        <MapGeofence />
        <MapRoutePath positions={positions} />
        <MapRoutePoints positions={positions} onClick={onPointClick} />
        {index < positions.length && (
          <MapPositions
            positions={[positions[index]]}
            onClick={onMarkerClick}
            titleField='fixTime'
          />
        )}
      </MapView>
      <MapCamera positions={positions} />
      <div className={classes.sidebar}>
        <Paper square>
          <Toolbar>
            <IconButton
              edge='start'
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {t('reportReplay')}
            </Typography>
            <FormLabel className='center'>
              <Checkbox
                color='primary'
                checked={showTable}
                onChange={() => setShowTable(!showTable)}
              />
              Tabla
            </FormLabel>
            {!expanded && (
              <>
                <PDFDownloadButton positions={positions} deviceName={deviceName} />
                {/* <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton> */}
              </>
            )}
            <IconButton edge='end' onClick={() => setExpanded(true)}>
              <Tune />
            </IconButton>
          </Toolbar>
        </Paper>
        <Paper className={classes.content}>
          {!expanded ? (
            <>
              <Typography variant='subtitle1' align='center'>
                {deviceName}
              </Typography>
              <Slider
                className={classes.slider}
                max={positions.length - 1}
                step={null}
                marks={positions.map((_, index) => ({ value: index }))}
                value={index}
                onChange={(_, index) => setIndex(index)}
              />
              <Paper>
                {`${index + 1}/${positions.length}`}
                <IconButton
                  onClick={() => setIndex((index) => index - 1)}
                  disabled={playing || index <= 0}
                >
                  <FastRewindIcon />
                </IconButton>
                <IconButton
                  onClick={() => setPlaying(!playing)}
                  disabled={index >= positions.length - 1}
                >
                  {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton
                  onClick={() => setIndex((index) => index + 1)}
                  disabled={playing || index >= positions.length - 1}
                >
                  <FastForwardIcon />
                </IconButton>
                {formatTime(positions[index].fixTime, 'seconds', hours12)}
              </Paper>
              {showTable && positions && (
                <TableContainer component={Paper} className={classes.table}>
                  <Table sx={{ minWidth: 300 }} aria-label='Points table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='right'>Speed</TableCell>
                        <TableCell align='right'>Time</TableCell>
                        {positions[0].attributes.bleTemp1 && (
                          <TableCell align='right'>Temperature</TableCell>
                        )}
                        <TableCell align='right' />
                      </TableRow>
                    </TableHead>
                    <TableBody ref={tableRef}>
                      {positions.map((row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                          className={i === index ? classes.active : null}
                          onClick={() => setIndex(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell align='right'>
                            <PositionValue
                              position={row}
                              property='speed'
                              attribute={row.speed}
                            />
                          </TableCell>
                          <TableCell align='right'>
                            {formatTime(row.fixTime, 'seconds', hours12)}
                          </TableCell>
                          {row.attributes.bleTemp1 && (
                            <TableCell align='right'>
                              {Math.round(row.attributes.bleTemp1)}° /{' '}
                              {Math.round(
                                Math.round(row.attributes.bleTemp1) * (9 / 5) +
                                32
                              )}
                              °
                            </TableCell>
                          )}
                          <TableCell align='right'>
                            {formatDistance(
                              row.attributes.totalDistance,
                              distanceUnit,
                              t
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          ) : (
            <>
              {searching && (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              )}
              <ReportFilter handleSubmit={handleSubmit} fullScreen showOnly />
            </>
          )}
        </Paper>
      </div>
      {/* {showCard && index < positions.length && (
        <StatusCard
          deviceId={selectedDeviceId}
          position={positions[index]}
          onClose={() => setShowCard(false)}
          disableActions
        />
      )} */}
      <StatusCard
        deviceId={selectedDeviceId}
        position={positions[index]}
        onClose={() => setShowCard(false)}
        disableActions
      />
    </div>
  );
};

export default ReplayPage;
