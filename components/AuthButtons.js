// components/AuthButtons.js
import { useState } from 'react';
import { Button } from './ui/button';
import { signInWithGoogle, logOut } from '../lib/auth';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

export default function AuthButtons({ user, onAuthChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        toast({
          title: 'ログイン成功',
          description: `${result.user.displayName}さん、ようこそ！`,
        });
        if (onAuthChange) onAuthChange(result.user);
      } else {
        toast({
          variant: 'destructive',
          title: 'ログイン失敗',
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'ログイン失敗',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await logOut();
      if (result.success) {
        toast({
          title: 'ログアウト成功',
          description: 'ログアウトしました',
        });
        if (onAuthChange) onAuthChange(null);
      } else {
        toast({
          variant: 'destructive',
          title: 'ログアウト失敗',
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'ログアウト失敗',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="font-medium">{user.displayName}</span>
        </div>
        <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          ログアウト
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
      Googleでログイン
    </Button>
  );
}
