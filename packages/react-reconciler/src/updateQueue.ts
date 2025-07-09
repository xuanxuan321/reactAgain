import { Action } from "shared/ReactTypes";

export interface Update<State> {
  action: Action<State>;
}

/**
 * 创建一个 update
 * @param action anction
 * @returns
 */
export const createUpdate = <State>(action: Action<State>) => {
  return {
    action,
  };
};

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

/**
 * 创建 update 队列
 * @returns
 */
export const createUpdateQueue = <State>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<State>;
};

/**
 * 将 update 入队
 * @param updateQueue 更新队列
 * @param update update
 */
export const enqueueUpdate = <State>(
  updateQueue: UpdateQueue<State>,
  update: Update<State>
) => {
  updateQueue.shared.pending = update;
};

/**
 * 处理 update 队列
 * @param baseState 基础 state
 * @param pendingUpdate update
 * @returns
 */
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  };
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }
  return result;
};
