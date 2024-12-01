"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [alarmTime, setAlarmTime] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(false)
  const [quote, setQuote] = useState<string>('')
  const { toast } = useToast()

  // 获取励志语录
  useEffect(() => {
    const quotes = [
      "生命不是等待暴风雨过去，而是学会在雨中跳舞。",
      "当你感到困难的时候，就是你成长的时候。",
      "把每一个平凡的日子，都过成诗一般的生活。",
      "生活不会辜负每一个努力的人。",
      "保持热爱，奔赴山海。"
    ]
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      setCurrentTime(timeString)

      // 检查是否到达闹钟时间
      if (alarmTime === timeString && !isAlarmActive) {
        setIsAlarmActive(true)
        playAlarm()
        toast({
          title: "闹钟提醒",
          description: "设定的时间到啦！",
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [alarmTime, isAlarmActive])

  // 播放闹钟声音
  const playAlarm = () => {
    const audio = new Audio('/alarm-sound.mp3')
    audio.play()
  }

  // 设置闹钟
  const handleSetAlarm = () => {
    setIsAlarmActive(false)
    toast({
      title: "闹钟已设置",
      description: `闹钟将在 ${alarmTime} 响起`,
    })
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>智能闹钟助手</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-2xl font-bold">
              当前时间: {currentTime}
            </div>
            <div className="flex space-x-4">
              <Input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSetAlarm}>设置闹钟</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今日鸡汤</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center italic">{quote}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>每日图片</CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src="https://source.unsplash.com/random/800x400?nature,morning" 
              alt="随机励志图片"
              className="w-full rounded-lg"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 