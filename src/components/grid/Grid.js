import React from 'react';
import Node from '../node/Node';
import './Grid.css';
import {
  IDLE,
  DRAGGING_START,
  DRAGGING_FINISH,
  DRAWING,
  ERASING,
  INITIAL_NODE,
} from '../../constants';
import { isFinishPos, isStartOrFinishPos, isStartPos } from '../../algorithms/OtherHelperFunctions';

export default class Grid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mode = IDLE;
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handlePointerUp);
    window.addEventListener('touchend', this.handlePointerUp);
    window.addEventListener('touchcancel', this.handlePointerUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handlePointerUp);
    window.removeEventListener('touchend', this.handlePointerUp);
    window.removeEventListener('touchcancel', this.handlePointerUp);
  }

  // Event handlers
  handlePointerDown = (e) => {
    const { start, finish, updateNodeType, drawType } = this.props;

    if (!e.target.classList.contains('grid_node')) {
      return;
    }

    const rowIdx = Number(e.target.dataset.rowIdx);
    const colIdx = Number(e.target.dataset.colIdx);
    if (isStartPos(colIdx, rowIdx, start)) {
      this.mode = DRAGGING_START;
    } else if (isFinishPos(colIdx, rowIdx, finish)) {
      this.mode = DRAGGING_FINISH;
    } else {
      // e.target.dataset.type === NODE_INITIAL
      if (e.target.className === 'grid_node') {
        this.mode = DRAWING;
        updateNodeType(rowIdx, colIdx, drawType.current); // NODE_WALL
      } else {
        this.mode = ERASING;
        updateNodeType(rowIdx, colIdx, INITIAL_NODE);
      }
    }
  };

  handlePointerUp = () => {
    this.mode = IDLE;
  };

  handlePointerMove = (e) => {
    let { start, finish } = this.props;
    const { updateNodeType, drawType } = this.props;

    const realTarget =
      e.type !== 'touchmove'
        ? e.target
        : document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);

    if (!realTarget.classList.contains('grid_node')) {
      return;
    }

    const rowIdx = Number(realTarget.dataset.rowIdx);
    const colIdx = Number(realTarget.dataset.colIdx);

    switch (this.mode) {
      case DRAGGING_START:
        if (isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.moveNodePos(rowIdx, colIdx, start);
        this.recomputeShortestPath();
        break;
      case DRAGGING_FINISH:
        if (isStartOrFinishPos(colIdx, rowIdx, start, finish)) {
          return;
        }
        this.moveNodePos(rowIdx, colIdx, finish);
        this.recomputeShortestPath();
        break;
      case DRAWING:
        updateNodeType(rowIdx, colIdx, drawType.current); // NODE_WALL
        break;
      case ERASING:
        updateNodeType(rowIdx, colIdx, INITIAL_NODE);
        break;
      default:
        return;
    }
  };

  // Helper methods
  moveNodePos = (rowIdx, colIdx, nodePos) => {
    const { updateNodeCache } = this.props;
    const prevX = nodePos.x;
    const prevY = nodePos.y;
    nodePos.y = rowIdx;
    nodePos.x = colIdx;
    updateNodeCache.get(`${prevY}-${prevX}`).forceNodeUpdate();
    updateNodeCache.get(`${rowIdx}-${colIdx}`).forceNodeUpdate();
  };

  recomputeShortestPath = () => {
    const {
      canDragToVisualize,
      clearBoard,
      initPathfinder,
      pathfinder,
    } = this.props;
    if (canDragToVisualize.current) {
      clearBoard(false);
      initPathfinder(false);
      pathfinder.current.run();
    }
  };

  render() {
    const { board, start, finish, updateNodeCache } = this.props;
    return (
      <div
        id="grid"
        onMouseDown={this.handlePointerDown}
        onMouseMove={this.handlePointerMove}
        onTouchStart={this.handlePointerDown}
        onTouchMove={this.handlePointerMove}
        onTouchEnd={(e) => e.preventDefault()}
      >
        {board.map((row, rowIdx) => {
          return (
            <div key={rowIdx} id={`row-${rowIdx}`} className="grid-row">
              {row.map((col, colIdx) => {
                return (
                  <Node
                    key={`${rowIdx}-${colIdx}`}
                    rowIdx={rowIdx}
                    colIdx={colIdx}
                    start={start}
                    finish={finish}
                    updateNodeCache={updateNodeCache}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
