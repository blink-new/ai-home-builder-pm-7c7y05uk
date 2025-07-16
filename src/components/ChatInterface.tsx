import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Send, 
  Mic, 
  Paperclip, 
  Bot, 
  User, 
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Home
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  artifacts?: any[]
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI construction expert. I can help you manage your custom home building projects through natural conversation. What would you like to work on today?",
      timestamp: new Date(),
      artifacts: []
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    let response = ""
    let artifacts: any[] = []

    if (input.includes('project') && input.includes('status')) {
      response = "Here's the current status of your active projects. The Malibu Villa is progressing well in the foundation phase, while the Beverly Hills Townhouse is moving into framing. Would you like me to dive deeper into any specific project?"
      artifacts = [
        {
          type: 'project_summary',
          data: {
            totalProjects: 12,
            onSchedule: 8,
            delayed: 2,
            planning: 2
          }
        }
      ]
    } else if (input.includes('budget') || input.includes('cost')) {
      response = "I can see you're asking about budget. Your current portfolio is performing well - you're 5% under budget overall. The Malibu Villa has some material cost increases we should discuss. Would you like me to show you the detailed budget breakdown?"
      artifacts = [
        {
          type: 'budget_alert',
          data: {
            totalBudget: '$2.4M',
            spent: '$1.8M',
            remaining: '$600K',
            variance: '-5%'
          }
        }
      ]
    } else if (input.includes('schedule') || input.includes('timeline')) {
      response = "Looking at your project timelines, most are on track. However, I notice the Beverly Hills project might face a 2-week delay due to permit approvals. I can help you adjust the schedule and notify your subcontractors. Should I proceed with the timeline updates?"
      artifacts = [
        {
          type: 'timeline_update',
          data: {
            project: 'Beverly Hills Townhouse',
            originalDate: '2024-03-15',
            newDate: '2024-03-29',
            reason: 'Permit delays'
          }
        }
      ]
    } else if (input.includes('team') || input.includes('contractor')) {
      response = "Your team coordination looks good. All 24 team members are accounted for, with 3 contractors currently active on-site. Mike's electrical crew is scheduled for the Malibu project next week. Need me to send any updates or schedule changes?"
      artifacts = [
        {
          type: 'team_status',
          data: {
            totalMembers: 24,
            activeContractors: 3,
            upcomingSchedule: 'Mike\'s Electrical - Malibu Villa'
          }
        }
      ]
    } else {
      response = "I understand you're asking about your construction projects. I can help you with project status, budget tracking, timeline management, team coordination, and much more. Try asking me something like 'What's the status of my projects?' or 'Show me the budget overview'."
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      artifacts
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderArtifact = (artifact: any) => {
    switch (artifact.type) {
      case 'project_summary':
        return (
          <Card className="mt-3 bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Home className="w-4 h-4 mr-2 text-blue-600" />
                Project Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Total Projects:</span>
                  <Badge variant="secondary">{artifact.data.totalProjects}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>On Schedule:</span>
                  <Badge className="bg-green-100 text-green-800">{artifact.data.onSchedule}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Delayed:</span>
                  <Badge variant="destructive">{artifact.data.delayed}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Planning:</span>
                  <Badge variant="outline">{artifact.data.planning}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'budget_alert':
        return (
          <Card className="mt-3 bg-amber-50 border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-amber-600" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Budget:</span>
                  <span className="font-medium">{artifact.data.totalBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spent:</span>
                  <span>{artifact.data.spent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="text-green-600 font-medium">{artifact.data.remaining}</span>
                </div>
                <div className="flex justify-between">
                  <span>Variance:</span>
                  <Badge className="bg-green-100 text-green-800">{artifact.data.variance}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'timeline_update':
        return (
          <Card className="mt-3 bg-orange-50 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                Timeline Update Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div><strong>Project:</strong> {artifact.data.project}</div>
                <div><strong>Original Date:</strong> {artifact.data.originalDate}</div>
                <div><strong>New Date:</strong> {artifact.data.newDate}</div>
                <div><strong>Reason:</strong> {artifact.data.reason}</div>
                <Button size="sm" className="mt-2">Approve Changes</Button>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'team_status':
        return (
          <Card className="mt-3 bg-purple-50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Members:</span>
                  <Badge variant="secondary">{artifact.data.totalMembers}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Active Contractors:</span>
                  <Badge className="bg-green-100 text-green-800">{artifact.data.activeContractors}</Badge>
                </div>
                <div className="mt-2">
                  <strong>Upcoming:</strong> {artifact.data.upcomingSchedule}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Construction Expert</h2>
              <p className="text-sm text-gray-500">Ready to help with your projects</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600 ml-3' : 'bg-gray-200 mr-3'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  
                  {/* Render artifacts for AI messages */}
                  {message.type === 'ai' && message.artifacts && message.artifacts.map((artifact, index) => (
                    <div key={index}>
                      {renderArtifact(artifact)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your projects, budget, timeline, or team..."
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="h-8 w-8"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setInputValue("What's the status of my projects?")}
          >
            Project Status
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setInputValue("Show me the budget overview")}
          >
            Budget Overview
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setInputValue("Any timeline updates needed?")}
          >
            Timeline Check
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setInputValue("How is my team doing?")}
          >
            Team Status
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface