// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import ChatInterface from '../components/ChatInterface';
import AuthButtons from '../components/AuthButtons';
import SecretManager from '../components/SecretManager';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function Home({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Job Matching SaaS</title>
        <meta name="description" content="AIを活用した求人マッチングサービス" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Matching SaaS</h1>
          <AuthButtons user={user} onAuthChange={setUser} />
        </div>
      </header>

      <main className="container mx-auto py-8">
        {user ? (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="chat">チャットアシスタント</TabsTrigger>
              <TabsTrigger value="resume">職務経歴書分析</TabsTrigger>
              <TabsTrigger value="settings">設定</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-4">
              <ChatInterface userId={user.uid} />
            </TabsContent>
            
            <TabsContent value="resume">
              <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>職務経歴書分析</CardTitle>
                  <CardDescription>
                    職務経歴書と求人情報を入力して、マッチング度を分析します
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    この機能は開発中です。もうしばらくお待ちください。
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <SecretManager />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-4">AIを活用した求人マッチングサービス</h2>
            <p className="text-xl mb-8">
              ログインして、AIチャットアシスタントや職務経歴書分析機能を利用しましょう。
            </p>
            <AuthButtons user={user} onAuthChange={setUser} />
          </div>
        )}
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto py-6 text-center text-muted-foreground">
          &copy; 2025 Job Matching SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
