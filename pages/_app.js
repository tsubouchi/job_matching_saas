// pages/_app.js
import { useState, useEffect } from 'react';
import { ToastProvider } from '../components/ui/use-toast';
import { onAuthStateChange } from '../lib/auth';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // コンポーネントのアンマウント時に監視を解除
    return () => unsubscribe();
  }, []);

  return (
    <ToastProvider>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Component {...pageProps} user={user} setUser={setUser} />
      )}
    </ToastProvider>
  );
}
