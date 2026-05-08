import { useEffect, useState } from 'react';
import type { Controller } from '@coveo/headless';

export function useControllerState<C extends Controller>(controller: C): C['state'] {
  const [state, setState] = useState<C['state']>(controller.state);
  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller],
  );
  return state;
}
