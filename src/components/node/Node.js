import React from 'react';
import './Node.css';
import {
  SHORTEST_PATH_NODE,
  VISITED_NODE,
  INITIAL_NODE,
  FINISH_NODE,
  START_NODE,
} from '../../constants';
import { isFinishPos, isStartPos } from '../../algorithms/OtherHelperFunctions';

export default class Node extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: INITIAL_NODE,
      isVisited: false,
      isShortest: false,
      isAnimated: true,
    };

    const { rowIdx, colIdx } = this.props;
    let { updateNodeCache } = this.props;
    updateNodeCache.set(`${rowIdx}-${colIdx}`, {
      setType: this.setType,
      setIsVisited: this.setIsVisited,
      setIsShortest: this.setIsShortest,
      forceNodeUpdate: this.forceNodeUpdate,
    });
  }

  // Set state methods
  setType = (value) => {
    this.setState({ type: value });
  };

  setIsVisited = (value) => {
    this.setState({ isVisited: value.isVisited, isAnimated: value.isAnimated });
  };

  setIsShortest = (value) => {
    this.setState({
      isShortest: value.isShortest,
      isAnimated: value.isAnimated,
    });
  };

  forceNodeUpdate = () => {
    this.forceUpdate();
  };

  // Helper methods
  getNodeClassNames() {
    const { rowIdx, colIdx, start, finish } = this.props;
    if (isStartPos(colIdx, rowIdx, start)) {
      return ' ' + START_NODE;
    }
    if (isFinishPos(colIdx, rowIdx, finish)) {
      return ' ' + FINISH_NODE;
    }
    if (this.state.type === INITIAL_NODE) {
      return '';
    }
    return ' ' + this.state.type;
  }

  getPathClassNames() {
    let extraClassNames = '';
    if (this.state.isVisited) {
      extraClassNames += ' ' + VISITED_NODE;
      if (this.state.isAnimated) {
        extraClassNames += ' animated';
      }
    }
    if (this.state.isShortest) {
      extraClassNames += ' ' + SHORTEST_PATH_NODE;
      if (this.state.isAnimated) {
        extraClassNames += ' animated';
      }
    }
    return extraClassNames;
  }

  render() {
    const { rowIdx, colIdx } = this.props;
    return (
      <div
        id={`node-${rowIdx}-${colIdx}`}
        className={`grid_node${this.getNodeClassNames()}`}
        data-row-idx={rowIdx}
        data-col-idx={colIdx}
      >
        <div className={`path${this.getPathClassNames()}`} />
      </div>
    );
  }
}
