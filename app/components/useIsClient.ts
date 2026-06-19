import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first client paint, then true once mounted —
 * without a setState-in-effect. Lets components keep server/first-render markup
 * stable (avoiding hydration mismatches) before switching to client-only or
 * reduced-motion variants.
 */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
