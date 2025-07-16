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
  Home,
  Sparkles
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
      content: "Hello! I'm Claude, your AI construction expert. I can help you manage your custom home building projects through natural conversation. What would you like to work on today?",
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
          <Card className="mt-3 claude-surface claude-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center claude-text">
                <Home className="w-4 h-4 mr-2 text-blue-400" />
                Project Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="claude-text-muted">Total Projects:</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">{artifact.data.totalProjects}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">On Schedule:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{artifact.data.onSchedule}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Delayed:</span>
                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">{artifact.data.delayed}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Planning:</span>
                  <Badge variant="outline" className="claude-border claude-text-muted">{artifact.data.planning}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'budget_alert':
        return (
          <Card className="mt-3 claude-surface claude-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center claude-text">
                <DollarSign className="w-4 h-4 mr-2 text-amber-400" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="claude-text-muted">Total Budget:</span>
                  <span className="font-medium claude-text">{artifact.data.totalBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Spent:</span>
                  <span className="claude-text">{artifact.data.spent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Remaining:</span>
                  <span className="text-green-400 font-medium">{artifact.data.remaining}</span>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Variance:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{artifact.data.variance}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'timeline_update':
        return (
          <Card className="mt-3 claude-surface claude-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center claude-text">
                <Clock className="w-4 h-4 mr-2 text-orange-400" />
                Timeline Update Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="claude-text"><strong>Project:</strong> {artifact.data.project}</div>
                <div className="claude-text"><strong>Original Date:</strong> {artifact.data.originalDate}</div>
                <div className="claude-text"><strong>New Date:</strong> {artifact.data.newDate}</div>
                <div className="claude-text"><strong>Reason:</strong> {artifact.data.reason}</div>
                <Button size="sm" className="mt-2 claude-accent">Approve Changes</Button>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'team_status':
        return (
          <Card className="mt-3 claude-surface claude-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center claude-text">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="claude-text-muted">Total Members:</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">{artifact.data.totalMembers}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="claude-text-muted">Active Contractors:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{artifact.data.activeContractors}</Badge>
                </div>
                <div className="mt-2 claude-text">
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
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <div className="claude-border border-b p-4 claude-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 claude-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold claude-text">Claude Construction Expert</h2>
              <p className="text-sm claude-text-muted">Ready to help with your projects</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 claude-scrollbar" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message-fade-in`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'claude-accent ml-3' : 'claude-surface mr-3'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-orange-400" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'claude-accent text-background' 
                    : 'claude-surface claude-text'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-background/70' : 'claude-text-muted'
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
            <div className="flex justify-start message-fade-in">
              <div className="flex">
                <div className="w-8 h-8 rounded-full claude-surface mr-3 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
                <div className="claude-surface rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="claude-border border-t p-4 claude-surface">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="claude-surface-hover">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your projects, budget, timeline, or team..."
              className="pr-20 claude-surface claude-border claude-text placeholder:claude-text-muted"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 claude-surface-hover">
                <Mic className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="h-8 w-8 claude-accent"
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
            className="claude-surface-hover claude-border claude-text"
            onClick={() => setInputValue("What's the status of my projects?")}
          >
            Project Status
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="claude-surface-hover claude-border claude-text"
            onClick={() => setInputValue("Show me the budget overview")}
          >
            Budget Overview
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="claude-surface-hover claude-border claude-text"
            onClick={() => setInputValue("Any timeline updates needed?")}
          >
            Timeline Check
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="claude-surface-hover claude-border claude-text"
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