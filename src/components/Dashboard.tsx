import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  Home, 
  Calendar, 
  DollarSign, 
  Users, 
  BarChart3,
  Mic,
  Send,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Settings
} from 'lucide-react'
import ChatInterface from './ChatInterface'
import ProjectOverview from './ProjectOverview'
import TimelineView from './TimelineView'
import BudgetTracker from './BudgetTracker'
import TeamDirectory from './TeamDirectory'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat')

  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      icon: Home,
      change: '+2 this month',
      color: 'text-blue-400'
    },
    {
      title: 'On Schedule',
      value: '8',
      icon: Clock,
      change: '67% completion rate',
      color: 'text-green-400'
    },
    {
      title: 'Budget Status',
      value: '$2.4M',
      icon: DollarSign,
      change: '5% under budget',
      color: 'text-amber-400'
    },
    {
      title: 'Team Members',
      value: '24',
      icon: Users,
      change: '3 contractors active',
      color: 'text-purple-400'
    }
  ]

  const recentProjects = [
    {
      id: 1,
      name: 'Luxury Villa - Malibu',
      status: 'Foundation',
      progress: 25,
      budget: '$850K',
      timeline: '8 months',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Modern Townhouse - Beverly Hills',
      status: 'Framing',
      progress: 45,
      budget: '$1.2M',
      timeline: '10 months',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Eco Home - Santa Monica',
      status: 'Planning',
      progress: 10,
      budget: '$650K',
      timeline: '12 months',
      priority: 'low'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="claude-surface claude-border border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 claude-accent rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-semibold claude-text">FutureBuild AI</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="claude-surface-hover claude-border">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button variant="ghost" size="icon" className="claude-surface-hover">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 claude-surface claude-border border-r">
          <div className="p-4">
            <nav className="space-y-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0 space-y-1">
                  <TabsTrigger 
                    value="chat" 
                    className="w-full justify-start h-10 px-3 rounded-lg claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background font-medium"
                  >
                    <MessageCircle className="w-4 h-4 mr-3" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger 
                    value="overview" 
                    className="w-full justify-start h-10 px-3 rounded-lg claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background font-medium"
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline" 
                    className="w-full justify-start h-10 px-3 rounded-lg claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background font-medium"
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger 
                    value="budget" 
                    className="w-full justify-start h-10 px-3 rounded-lg claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background font-medium"
                  >
                    <DollarSign className="w-4 h-4 mr-3" />
                    Budget
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="w-full justify-start h-10 px-3 rounded-lg claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background font-medium"
                  >
                    <Users className="w-4 h-4 mr-3" />
                    Team
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </nav>
          </div>

          {/* Quick Stats in Sidebar */}
          <div className="px-4 pb-4">
            <div className="claude-surface rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-medium claude-text-muted uppercase tracking-wide">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm claude-text-muted">Active Projects</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm claude-text-muted">Pending Tasks</span>
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm claude-text-muted">Completed</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">24</Badge>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="chat" className="h-full m-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="overview" className="h-full m-0 p-6 overflow-auto claude-scrollbar">
              <ProjectOverview stats={stats} recentProjects={recentProjects} />
            </TabsContent>
            
            <TabsContent value="timeline" className="h-full m-0 p-6 overflow-auto claude-scrollbar">
              <TimelineView />
            </TabsContent>
            
            <TabsContent value="budget" className="h-full m-0 p-6 overflow-auto claude-scrollbar">
              <BudgetTracker />
            </TabsContent>
            
            <TabsContent value="team" className="h-full m-0 p-6 overflow-auto claude-scrollbar">
              <TeamDirectory />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default Dashboard