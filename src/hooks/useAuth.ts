import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase'; // 名前付きエクスポートをインポート

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (auth) { // authが定義されている場合のみ実行
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          router.push('/login');
        }
      });

      return () => unsubscribe();
    }
  }, [router]);

  return { user };
};

export default useAuth;
