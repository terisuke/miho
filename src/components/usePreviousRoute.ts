import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function usePreviousRoute(): string {
  const router = useRouter();
  const [previousRoute, setPreviousRoute] = useState<string>("");

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPreviousRoute(router.asPath);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return previousRoute;
}