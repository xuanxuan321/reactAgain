import { FiberNode, FiberRootNode, createWorkInProgress } from "./fiber";
import { beginWork } from "./beginWork";
import { completeWork } from "./complete";
import { HostRoot } from "./workTags";

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
  workInProgress = createWorkInProgress(root.current, {});
}
export function scheduleUpdateOnFiber(fiber: FiberNode) {
  const root = markUpdateLaneFromFiberToRoot(fiber);
  renderRoot(root);
}

function markUpdateLaneFromFiberToRoot(fiber: FiberNode) {
  let node = fiber;
  let parent = node.return;
  while (parent !== null) {
    node = parent;
    parent = node.return;
  }
  if (node.tag === HostRoot) {
    return node.stateNode;
  }
  return null;
}

function renderRoot(root: FiberRootNode) {
  prepareFreshStack(root);
  do {
    try {
      workLoop();
      break;
    } catch (error) {
      workInProgress = null;
      console.error("workLoop failed", error);
    }
  } while (workInProgress !== null);
  return workInProgress;
}

function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  fiber.memoizedProps = fiber.pendingProps;
  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workInProgress = next;
  }
  return next;
}

function completeUnitOfWork(fiber: FiberNode) {
  const node = fiber;
  do {
    completeWork(node);
    const sibling = node.sibling;
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }
    const parent = node.return;
    if (parent !== null) {
      workInProgress = parent;
    }
  } while (node !== null);
}
