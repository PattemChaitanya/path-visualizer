import React from 'react';
import {Timer} from '../../algorithms/OtherHelperFunctions';
import {
  ALGORITHMS,
  DELAY_SPEEDS,
} from '../../constants';
import {
  Grid,
  Button,
  Select,
  FormControl,
  MenuItem,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

class Navbar extends React.PureComponent {
  // Event handlers
  handleVisualize = () => {
    const {
      clearBoard,
      setIsVisualizing,
      initPathfinder,
      pathfinder,
      setCanDragToVisualize,
      delayInterval,
    } = this.props;

    clearBoard(false);
    setIsVisualizing(true);

    initPathfinder();
    const finalCounter = pathfinder.current.run();
    const timer = new Timer(
      () => {
        setIsVisualizing(false);
        pathfinder.current.timers.shift();
      },
      finalCounter * delayInterval
    );
    pathfinder.current.timers.push(timer);
    setCanDragToVisualize(true);
  };

  handleClear = (clearWalls) => {
    const { clearBoard, setCanDragToVisualize } = this.props;
    clearBoard(clearWalls);
    setCanDragToVisualize(false);
  };

  handleSelectAlgorithm = (e) => {
    const { setAlgorithmType } = this.props;
    setAlgorithmType(e.target.value);
  };

  handleSelectSpeed = (e) => {
    const { setDelayInterval } = this.props;
    setDelayInterval(e.target.value);
  };

  render() {
    const {
      algorithmType,
      delayInterval,
      setModalOn
    } = this.props;
    console.log(this.props.pathfinder.current)
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ margin: "15px 0" }}>
        <Grid container item xs={1} justifyContent="flex-end">
          <Typography variant="h6" sx={{ textTransform: "uppercase"}}>
            <Link href="/" underline='hover'>
              pathfinding Visualize
            </Link>
          </Typography>
        </Grid>
        <Grid container item xs={8} spacing={2} justifyContent='center' sx={{ marginLeft: "20px"}}>
        <Grid item>
          <FormControl size="small">
            <Select
              value={algorithmType}
              onChange={this.handleSelectAlgorithm}
              id="select-algorithm"
              labelId="select-algorithm-label"
            >
              {ALGORITHMS.map((algorithm)=> {
                return (
                  <MenuItem key={algorithm.value} value={algorithm.value}>
                    {algorithm.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <Select
              value={delayInterval}
              onChange={this.handleSelectSpeed}
              id="select-speed"
              labelId='select-speed-label'
            >
              {DELAY_SPEEDS.map((speed)=> {
                return (
                  <MenuItem key={speed.value} value={speed.value}>
                    {speed.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item >
          <Button color="success" variant="contained" onClick={this.handleVisualize}>
              Visualize
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => this.handleClear(true)}>
              Clear Board
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={() => this.handleClear(false)}>
              Clear Path
          </Button>
        </Grid>
        <Grid item>
            <Button onClick={setModalOn}>
              How to use
            </Button>
        </Grid>
        </Grid>
        <Grid container item xs={1} justifyContent="flex-end">
          <IconButton href="/">
            <GitHubIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default Navbar;
