import { WorkTag } from "./workTags";
import { Props, Key, Ref } from "shared/ReactTypes";
import { NoFlags, Flags } from "./fiberFlags";
import { Container } from "hostConfig";

export class FiberNode {
  // TypeScript 写法中的字段声明 + 类型标注
  type: any;
  tag: WorkTag;
  pendingProps: Props | null;
  key: Key;
  stateNode: any;
  ref: Ref | null;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;
  memoizedProps: Props | null;
  memoizedState: any;
  alternate: FiberNode | null;
  flags: Flags;
  updateQueue: unknown;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.stateNode = null;
    this.type = null;

    //构成树状结构
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;
    this.ref = null;
    // 作为工作单元
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.memoizedState = null;
    this.alternate = null;
    //副作用标记
    this.flags = NoFlags;
    this.updateQueue = null;
  }
}

export class FiberRootNode {
  containerInfo: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;

  constructor(containerInfo: Container, hostRootFiber: FiberNode) {
    this.containerInfo = containerInfo;
    this.current = hostRootFiber;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;
  }
}

export const createWorkInProgress = (
  current: FiberNode,
  pendingProps: Props
): FiberNode => {
  let wip = current.alternate;
  if (wip === null) {
    //mount
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    //update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
    wip.type = current.type;
    wip.memoizedProps = current.memoizedProps;
    wip.ref = current.ref;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memoizedState = current.memoizedState;
  wip.memoizedProps = current.memoizedProps;

  return wip;
};
