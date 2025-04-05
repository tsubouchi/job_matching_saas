// components/ChatInterface.js
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function ChatInterface({ userId = 'user1', initialChatId = null }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(initialChatId);
  const scrollAreaRef = useRef(null);

  // チャット履歴を取得する関数
  const fetchChatHistory = async () => {
    if (!chatId) return;
    
    try {
      const response = await fetch(`/api/chat-history?chatId=${chatId}`);
      if (response.ok) {
        const data = await response.json();
        setChatHistory(data);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  // チャットIDが変更されたら履歴を取得
  useEffect(() => {
    if (chatId) {
      fetchChatHistory();
    }
  }, [chatId]);

  // 新しいメッセージが追加されたらスクロールを一番下に移動
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  // メッセージを送信する関数
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // 送信中は入力を無効化
    setIsLoading(true);
    
    // ユーザーメッセージをUIに追加（楽観的UI更新）
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      message: message,
      userId,
      timestamp: Date.now()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    try {
      // APIにメッセージを送信
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.message,
          userId,
          chatId
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // 新しいチャットの場合はチャットIDを更新
        if (!chatId && data.chatId) {
          setChatId(data.chatId);
        }
        
        // アシスタントの応答をUIに追加
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          message: data.message,
          userId: 'assistant',
          timestamp: Date.now()
        };
        
        setChatHistory(prev => [...prev, assistantMessage]);
      } else {
        console.error('Failed to send message:', await response.text());
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Job Matching Assistant</CardTitle>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                メッセージを送信して会話を開始してください
              </div>
            ) : (
              chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className={msg.role === 'user' ? 'bg-primary' : 'bg-secondary'}>
                      <AvatarFallback>
                        {msg.role === 'user' ? 'U' : 'AI'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.message}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="bg-secondary">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter>
        <form onSubmit={sendMessage} className="flex w-full gap-2">
          <Input
            placeholder="メッセージを入力..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            送信
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
