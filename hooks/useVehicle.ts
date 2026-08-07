'use client';

import { useEffect, useState } from 'react';
import { getVehicle } from '@/lib/api/getVehicle';
import type { Vehicle } from '@/types/vehicle';

export function useVehicle(id: string) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const data = await getVehicle(id);
        if (!cancelled) {
          if (!data) {
            setNotFound(true);
            setVehicle(null);
          } else {
            setVehicle(data);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load vehicle',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { vehicle, loading, error, notFound };
}
