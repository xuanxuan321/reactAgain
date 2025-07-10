import { FiberNode } from "./fiber";
import {
  HostRoot,
  HostComponent,
  HostText,
  FunctionComponent,
  Fragment,
} from "./workTags";
import { UpdateQueue } from "./updateQueue";
import { ReactElementT } from "shared/ReactTypes";
import { processUpdateQueue } from "./updateQueue";

// 递归过程中的递阶段
export const beginWork = (wip: FiberNode) => {
  // 比较，返回子fiberNode
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip);
    case HostComponent:
      return updateHostComponent(wip);
    case HostText:
      return null;
    default:
      if (__DEV__) {
        console.warn("beginWork 未实现的类型", wip.tag);
      }
      break;
  }
};

function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizedState;
  const updateQueue = wip.updateQueue as UpdateQueue<ReactElementT | null>;
  const pending = updateQueue.shared.pending;
  updateQueue.shared.pending = null;
  const { memoizedState } = processUpdateQueue(baseState, pending);
  wip.memoizedState = memoizedState;
  const nextChildren = wip.memoizedState;
  reconcileChildren(wip, nextChildren);

  return wip.child;
}

function updateHostComponent(wip: FiberNode) {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}

function reconcileChildren(wip: FiberNode, nextChildren: ReactElementT) {
  const current = wip.alternate;
  if (current !== null) {
    wip.child = reconcileChildFibers(wip, current.child, nextChildren);
  } else {
    wip.child = mountChildFiber(wip, null, nextChildren);
  }
}
