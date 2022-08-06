//node type
export const START_NODE = 'start_node';
export const FINISH_NODE = 'finish_node';
export const INITIAL_NODE = 'initial_node';
export const WALL_NODE = 'wall_node';

export const VISITED_NODE = 'visited_node';
export const SHORTEST_PATH_NODE = 'shortest_path';

//interval delay for speed controls
export const DELAY_SLOWEST = 400;
export const DELAY_SLOW = 200;
export const DELAY_NORMAL = 100;
export const DELAY_FAST = 50;
export const DELAY_IMMEDIATE = 0;

export const DELAY_SPEEDS = [
    { value: DELAY_SLOWEST, name: 'slowest' },
    { value: DELAY_SLOW, name: 'slow' },
    { value: DELAY_NORMAL, name: 'normal' },
    { value: DELAY_FAST, name: 'fast' },
    { value: DELAY_IMMEDIATE, name: 'immediate' }
];

//pathfinding algorithm
export const DIJKSTRA = 'dijkstra';
export const A_STAR = 'a-star';
export const BFS = 'BFS';
export const DFS = 'DFS';

export const ALGORITHMS = [
    { value: DIJKSTRA, name: 'Dijkstra' },
    { value: A_STAR, name: 'A Star' },
    { value: BFS, name: 'Breadth First Search' },
    { value: DFS, name: 'Depth First Search' },
];

//editing modes
export const IDLE = 'idle';
export const DRAGGING_START = 'dragging-start';
export const DRAGGING_FINISH = 'dragging-finish';
export const DRAWING = 'drawing';
export const ERASING = 'erasing';

export const WEIGHT_MAPPING = 0;
export const WEIGHT_REVERSE = 0;
export const MARKS = 0;