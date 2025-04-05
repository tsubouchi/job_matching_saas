// components/SecretManager.js
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function SecretManager() {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // 環境変数の状態を確認
  useEffect(() => {
    const checkEnvironmentVariables = async () => {
      try {
        const response = await fetch('/api/check-env');
        const data = await response.json();
        
        if (data.geminiApiKey) {
          setStatus({
            type: 'success',
            message: 'Gemini APIキーが設定されています'
          });
        } else {
          setStatus({
            type: 'warning',
            message: 'Gemini APIキーが設定されていません'
          });
        }
      } catch (error) {
        setStatus({
          type: 'error',
          message: '環境変数の確認中にエラーが発生しました'
        });
        console.error('Error checking environment variables:', error);
      }
    };

    checkEnvironmentVariables();
  }, []);

  // APIキーを保存
  const saveApiKey = async (e) => {
    e.preventDefault();
    
    if (!geminiApiKey.trim()) {
      setStatus({
        type: 'error',
        message: 'APIキーを入力してください'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/update-secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          geminiApiKey
        }),
      });
      
      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'APIキーが正常に保存されました'
        });
        setGeminiApiKey('');
      } else {
        const error = await response.json();
        setStatus({
          type: 'error',
          message: `APIキーの保存に失敗しました: ${error.message}`
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `APIキーの保存中にエラーが発生しました: ${error.message}`
      });
      console.error('Error saving API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>シークレット管理</CardTitle>
        <CardDescription>
          APIキーなどの機密情報を安全に管理します
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {status.type && (
          <Alert variant={status.type === 'error' ? 'destructive' : status.type === 'success' ? 'default' : 'warning'}>
            {status.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {status.type === 'success' ? '成功' : status.type === 'error' ? 'エラー' : '警告'}
            </AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={saveApiKey} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-api-key">Gemini APIキー</Label>
            <Input
              id="gemini-api-key"
              type="password"
              placeholder="APIキーを入力"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
