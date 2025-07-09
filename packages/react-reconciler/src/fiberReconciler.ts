import { FiberNode, FiberRootNode } from "./fiber";
import { Container } from "hostConfig";
import { HostRoot } from "./workTags";
import {
  createUpdateQueue,
  createUpdate,
  enqueueUpdate,
  UpdateQueue,
} from "./updateQueue";
import { ReactElementT } from "shared/ReactTypes";
import { scheduleUpdateOnFiber } from "./workLoop";

export function createContainer(containerInfo: Container) {
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const root = new FiberRootNode(containerInfo, hostRootFiber);
  hostRootFiber.stateNode = root;
  hostRootFiber.type = HostRoot;
  hostRootFiber.updateQueue = createUpdateQueue();
  return root;
}

export function updateContainer(
  element: ReactElementT | null,
  root: FiberRootNode
) {
  const hostRootFiber = root.current;
  const update = createUpdate<ReactElementT | null>(element);
  enqueueUpdate(
    hostRootFiber.updateQueue as UpdateQueue<ReactElementT | null>,
    update
  );
  scheduleUpdateOnFiber(hostRootFiber);
  return element;
}
