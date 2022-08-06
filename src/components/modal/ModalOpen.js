import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DFS from '../icons/Depth-First-Search.gif';
import BFS from '../icons/Breadth-First-Search.gif';
import AS from '../icons/A-star.gif';
import Dijkstra from '../icons/Dijkstra.gif';

const DialogsTitle = (props) => {
  const { children, onClose, ...others } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...others}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : (
          null
      )}
    </DialogTitle>
  )
}

export default function ModalOpen(props) {
  const { modalOn, setModalOn } = props;
  return (
    <div>
      <Dialog
        onClose={setModalOn}
        aria-labelledby="help-dialog"
        open={modalOn}
        scroll="paper"
      >
        <DialogsTitle onClose={setModalOn} >
          Help
        </DialogsTitle>
        <DialogContent dividers>
          <Typography>
            <h3>Visualizer</h3>
            <p>This is path visualizer. where you can finding the shortest between two nodes.</p>

            <h4>Algorithms used for Visualizing</h4>
            <p><strong>Djikstra</strong> - It is used to find the shortest path between a and b. It picks the unvisited vertex with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.</p> 
            <img src={Dijkstra} alt="Dijkstra's" /><br />
            <p><strong>A-Star (A*)</strong> - It is used for graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. Three types of A star are avalible namely Manhattan distance, Diagonal distance, Euclidean distance.</p>
            <img src={AS} alt="A*" /><br/>
            <p><strong>Breadth First Search (BFS)</strong> - It is used for searching a tree data structure for a node that satisfies a given property. It starts at the root/start node and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered while reaching the finish node.</p>
            <img src={BFS} alt="BFS" /><br />
            <p><strong>Depth First Search (DFS)</strong> - It is used for traversing or searching tree or graph data structures. The algorithm starts at the root/start node and explores as far as possible along each branch before reaching finish/final node</p>
            <img src={DFS} alt="DFS" /> <br />

            <strong>Steps to follow</strong><br />
            1. Click and drag on the board to add/remove walls. <br />
            2. Click and drag the start/end nodes to move them. <br />
            3. Choose the algorithm and speed from the drop-down menus. <br />
            4. Weighted algorithms (Djikstra and A*) will take weight nodes into
            account. <br />
            5. Unweighted algorithms (BFS and DFS) will ignore weight nodes
            (i.e. treat the nodes as empty). <br />
            6. DFS does not guarantee the shortest path, whereas the other
            algorithms do. <br />
            7. When the visualizer runs, it captures and uses a snapshot of the
            board and configurations.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
