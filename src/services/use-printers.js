import { useCallback, useEffect, useMemo, useState } from "react";
import { createPrintersApi } from "./printers-api.js";

export function usePrinters({ api: providedApi } = {}) {
  // Important: memoize the API so we don't create a fresh in-memory store on
  // every render (which would lose newly-created items between renders).
  const api = useMemo(() => providedApi ?? createPrintersApi(), [providedApi]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await api.list();
    if (result.ok) setItems(result.items);
    else setError(result.error);
    setLoading(false);
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (input) => {
      const r = await api.create(input);
      if (r.ok) await refresh();
      return r;
    },
    [api, refresh],
  );

  const update = useCallback(
    async (id, patch) => {
      const r = await api.update(id, patch);
      if (r.ok) await refresh();
      return r;
    },
    [api, refresh],
  );

  const remove = useCallback(
    async (id) => {
      const r = await api.remove(id);
      if (r.ok) await refresh();
      return r;
    },
    [api, refresh],
  );

  return { items, loading, error, refresh, create, update, remove };
}
