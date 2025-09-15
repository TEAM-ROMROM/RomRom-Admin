import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginForm() {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="아이디를 입력하세요"
                    required
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
                    required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
  )
};