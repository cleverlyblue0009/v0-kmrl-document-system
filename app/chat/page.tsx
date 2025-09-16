"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft, Bot, User, FileText, Copy, ThumbsUp, ThumbsDown, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: {
    name: string
    category: string
    confidence: number
  }[]
  isTyping?: boolean
}

const suggestedQuestions = [
  "What are the latest safety protocols for metro operations?",
  "Show me financial reports from Q4 2023",
  "What maintenance issues were reported this month?",
  "Summarize passenger feedback trends",
  "Find documents related to emergency procedures",
  "What are the compliance requirements for station operations?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI document assistant. I can help you find information, summarize documents, and answer questions about your KMRL document collection. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content:
            "Based on the latest safety protocols document (Metro_Safety_Protocol_2024.pdf), here are the key safety measures for metro operations:\n\n1. **Emergency Response**: All stations must have emergency response teams available 24/7\n2. **Passenger Safety**: Regular safety announcements every 15 minutes during peak hours\n3. **Equipment Checks**: Daily inspection of all safety equipment including fire extinguishers and emergency exits\n4. **Staff Training**: Monthly safety training sessions for all operational staff\n\nWould you like me to provide more specific details about any of these protocols?",
          sources: [
            { name: "Metro_Safety_Protocol_2024.pdf", category: "Safety Protocols", confidence: 96 },
            { name: "Emergency_Response_Guidelines.pdf", category: "Operational Guidelines", confidence: 88 },
          ],
        },
        {
          content:
            "I found several financial reports from Q4 2023. Here's a summary:\n\n**Revenue Performance:**\n- Total revenue: ₹45.2 crores (8% increase from Q3)\n- Passenger revenue: ₹38.7 crores\n- Non-fare revenue: ₹6.5 crores\n\n**Key Metrics:**\n- Daily ridership: 2.1 lakh passengers\n- Operating ratio: 0.78 (improved from 0.82)\n- Cost per kilometer: ₹156\n\n**Major Expenses:**\n- Staff costs: 42% of total expenses\n- Energy costs: 18% of total expenses\n- Maintenance: 15% of total expenses\n\nWould you like me to dive deeper into any specific financial aspect?",
          sources: [{ name: "Financial_Report_Q4_2023.pdf", category: "Financial Reports", confidence: 94 }],
        },
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: randomResponse.content,
        timestamp: new Date(),
        sources: randomResponse.sources,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">AI Document Assistant</h1>
                <p className="text-sm text-slate-600">Ask questions about your documents</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Suggested Questions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-3 rounded-md text-sm text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    {question}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Chat Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Messages today</span>
                  <span className="text-sm font-medium text-slate-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Documents referenced</span>
                  <span className="text-sm font-medium text-slate-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Avg response time</span>
                  <span className="text-sm font-medium text-slate-900">1.2s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Accuracy rate</span>
                  <span className="text-sm font-medium text-slate-900">94.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Document Q&A
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-3xl ${
                          message.type === "user" ? "bg-blue-900 text-white" : "bg-white border border-slate-200"
                        } rounded-lg p-4 shadow-sm`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {message.type === "user" ? (
                              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-emerald-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="prose prose-sm max-w-none">
                              <p
                                className={`${message.type === "user" ? "text-white" : "text-slate-900"} whitespace-pre-wrap`}
                              >
                                {message.content}
                              </p>
                            </div>

                            {message.sources && (
                              <div className="mt-3 space-y-2">
                                <p className="text-xs font-medium text-slate-600">Sources:</p>
                                {message.sources.map((source, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-slate-50 rounded border"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <FileText className="w-4 h-4 text-slate-500" />
                                      <span className="text-xs font-medium text-slate-700">{source.name}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {source.category}
                                      </Badge>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      {source.confidence}%
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-3">
                              <span
                                className={`text-xs ${message.type === "user" ? "text-blue-200" : "text-slate-500"}`}
                              >
                                {formatTime(message.timestamp)}
                              </span>
                              {message.type === "assistant" && (
                                <div className="flex items-center space-x-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-3xl bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Input Area */}
              <div className="flex-shrink-0 p-6 border-t border-slate-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask a question about your documents..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 bg-blue-900 hover:bg-blue-800"
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  AI can make mistakes. Verify important information with source documents.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
