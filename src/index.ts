import { useRef, useState } from 'react';

type onActionType = (...params: any[]) => Promise<any>;

interface ActionType {
  isLoading: boolean;
  isError: boolean;
  handleAction: onActionType;
  groupHandler: (
    fun: onActionType,
    key?: string
  ) => (...params: any) => Promise<any>;
  keys: string[];
}

const useLoading = (onAction?: onActionType): ActionType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const callRef = useRef(0);

  const load = () => setIsLoading(true);

  const notLoad = () => setIsLoading(false);

  const addKey = (key?: string) => {
    if (!key) return;
    setActiveKey(keys => {
      const index = keys.findIndex(k => k === key);
      return index === -1 ? [...keys, key] : keys;
    });
  };

  const removeKey = (key?: string) => {
    if (!key) return;
    setActiveKey(keys => {
      const index = keys.findIndex(k => k === key);
      return index === -1 ? keys : keys.splice(index, 1);
    });
  };

  const beforeLoad = (key: string | undefined) => {
    callRef.current += 1;
    addKey(key);
    load();
  };

  const afterLoad = (key: string | undefined) => {
    callRef.current -= 1;
    if (callRef.current === 0) {
      notLoad();
    }
    removeKey(key);
  };

  const handleAction: onActionType = async (...params: any[]) => {
    const DEFAULT_KEY = 'default';
    if (!onAction) return;
    beforeLoad(DEFAULT_KEY);
    const result = await onAction(...params)
      .then(() => setIsError(false))
      .catch(() => setIsError(true));
    afterLoad(DEFAULT_KEY);
    return result;
  };

  const groupHandler = (fun: onActionType, key?: string) => async (
    ...params: any
  ) => {
    beforeLoad(key);
    const result = await fun(...params)
      .then(() => setIsError(false))
      .catch(() => setIsError(true));
    afterLoad(key);
    return result;
  };

  return {
    isLoading,
    isError,
    handleAction,
    groupHandler,
    keys: activeKey,
  };
};

export default useLoading;
