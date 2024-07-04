import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router';
import { IconButton } from "../components/iconButton";
import { useTranslation } from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from '../lib/firebase'; // Firebaseの初期化をインポート

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">{t('Login / Sign Up')}</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-center justify-center">
          <IconButton
            iconName="24/Close" // デフォルトアイコン名を指定
            isProcessing={false}
            customIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            className="flex items-center px-4 py-2 space-x-2 font-bold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-oval"
            label={t('Login / Sign Up with Google')}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
