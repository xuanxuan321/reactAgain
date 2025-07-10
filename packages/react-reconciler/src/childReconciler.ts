import { FiberNode } from "./fiber";
import { ReactElementT } from "shared/ReactTypes";

export function ChildReconciler(shouldTrackSideEffects: boolean) {
  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild: ReactElementT
  ) {};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
