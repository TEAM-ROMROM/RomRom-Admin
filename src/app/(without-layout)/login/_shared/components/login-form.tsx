"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { login } from "@/app/(without-layout)/login/_shared/services/login-api";
import { useRouter } from "next/navigation";
import { isLocalhost } from "@/lib/utils";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tokenPair = await login({ username, password });

      // 로컬 테스트
      if (tokenPair?.accessToken && isLocalhost()) {
        localStorage.setItem('accessToken', tokenPair.accessToken);
      }
      router.replace('/');
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>RomRom 관리자 로그인</CardTitle>
              <CardDescription>RomRom 관리자 로그인 화면입니다</CardDescription>
            </div>
            <Image src="/icons/logo.svg" alt="logo" width="50" height="50" />
          </div>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="아이디를 입력하세요"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>

        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="loginForm" disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </Button>
          <div hidden={!error}>
            <p className="text-sm text-red-500">아이디 또는 비밀번호를 확인하세요</p>
          </div>
        </CardFooter>
      </Card>
  )
};