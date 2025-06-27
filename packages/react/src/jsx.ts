// ReactElement
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { Key, Ref, Props, ElementType, ReactElementT } from "shared/ReactTypes";

const ReactElement = function (
  type: ElementType,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementT {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: "sjh",
  };
  return element;
};

const jsx = (type: ElementType, config: any, ...maybeChildren: any[]) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;
  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = val + "";
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
      continue;
    }
  }
  const childrenLength = maybeChildren.length;
  if (childrenLength === 1) {
    props.children = maybeChildren[0];
  } else if (childrenLength > 1) {
    props.children = maybeChildren;
  }
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
