import Dijkstra from './Dijkstra';
import AStar from './AStar';
import BreadthFirstSearch from './BFS';
import DepthFirstSearch from './DFS';
import { DIJKSTRA, A_STAR, BFS, DFS } from '../constants';

const PATHFINDER_MAPPING = {
  [DIJKSTRA]: Dijkstra,
  [A_STAR]: AStar,
  [BFS]: BreadthFirstSearch,
  [DFS]: DepthFirstSearch,
};

export default PATHFINDER_MAPPING;
