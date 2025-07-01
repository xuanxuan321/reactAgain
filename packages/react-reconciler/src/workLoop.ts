import { FiberNode } from "./fiber";
import { beginWork } from "./beginWork";
import { completeWork } from "./complete";

let workInProgress: FiberNode | null = null;

function renderRoot(fiber: FiberNode) {
  prepareFreshStack(fiber);
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
function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber;
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

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  workInProgress = fiber;
}
