import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  Home,
  ArrowRight,
  Plus
} from 'lucide-react'

const TimelineView = () => {
  const [selectedProject, setSelectedProject] = useState('all')

  const projects = [
    {
      id: 'malibu-villa',
      name: 'Luxury Villa - Malibu',
      status: 'active',
      progress: 25
    },
    {
      id: 'beverly-townhouse',
      name: 'Modern Townhouse - Beverly Hills',
      status: 'active',
      progress: 45
    },
    {
      id: 'santa-monica-eco',
      name: 'Eco Home - Santa Monica',
      status: 'planning',
      progress: 10
    }
  ]

  const timelineEvents = [
    {
      id: 1,
      project: 'Luxury Villa - Malibu',
      projectId: 'malibu-villa',
      phase: 'Foundation',
      task: 'Foundation Pour Complete',
      date: '2024-01-15',
      status: 'completed',
      team: 'Foundation Crew',
      duration: '3 days',
      dependencies: []
    },
    {
      id: 2,
      project: 'Luxury Villa - Malibu',
      projectId: 'malibu-villa',
      phase: 'Foundation',
      task: 'Utility Rough-in',
      date: '2024-01-18',
      status: 'in-progress',
      team: 'Plumbing & Electrical',
      duration: '5 days',
      dependencies: ['Foundation Pour']
    },
    {
      id: 3,
      project: 'Modern Townhouse - Beverly Hills',
      projectId: 'beverly-townhouse',
      phase: 'Framing',
      task: 'First Floor Framing',
      date: '2024-01-20',
      status: 'scheduled',
      team: 'Framing Crew',
      duration: '7 days',
      dependencies: ['Foundation Complete']
    },
    {
      id: 4,
      project: 'Modern Townhouse - Beverly Hills',
      projectId: 'beverly-townhouse',
      phase: 'Permits',
      task: 'Electrical Permit Approval',
      date: '2024-01-22',
      status: 'delayed',
      team: 'Permit Office',
      duration: '2 weeks',
      dependencies: []
    },
    {
      id: 5,
      project: 'Eco Home - Santa Monica',
      projectId: 'santa-monica-eco',
      phase: 'Planning',
      task: 'Final Design Review',
      date: '2024-01-25',
      status: 'scheduled',
      team: 'Design Team',
      duration: '1 week',
      dependencies: []
    },
    {
      id: 6,
      project: 'Luxury Villa - Malibu',
      projectId: 'malibu-villa',
      phase: 'Framing',
      task: 'Wall Framing Start',
      date: '2024-01-28',
      status: 'upcoming',
      team: 'Framing Crew',
      duration: '10 days',
      dependencies: ['Utility Rough-in']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'scheduled': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'delayed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'upcoming': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-400" />
      case 'delayed': return <AlertTriangle className="w-4 h-4 text-red-400" />
      default: return <Calendar className="w-4 h-4 text-gray-400" />
    }
  }

  const filteredEvents = selectedProject === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.projectId === selectedProject)

  const upcomingMilestones = [
    {
      project: 'Malibu Villa',
      milestone: 'Framing Complete',
      date: '2024-02-15',
      daysLeft: 12
    },
    {
      project: 'Beverly Hills Townhouse',
      milestone: 'Roof Installation',
      date: '2024-02-28',
      daysLeft: 25
    },
    {
      project: 'Santa Monica Eco',
      milestone: 'Construction Start',
      date: '2024-03-10',
      daysLeft: 36
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold claude-text">Project Timeline</h1>
          <p className="claude-text-muted mt-1">Track progress and manage schedules across all projects</p>
        </div>
        <Button className="claude-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Project Filter */}
      <Card className="claude-surface claude-border">
        <CardHeader>
          <CardTitle className="text-lg claude-text">Filter by Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedProject} onValueChange={setSelectedProject}>
            <TabsList className="grid w-full grid-cols-4 claude-surface">
              <TabsTrigger value="all" className="claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background">All Projects</TabsTrigger>
              <TabsTrigger value="malibu-villa" className="claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background">Malibu Villa</TabsTrigger>
              <TabsTrigger value="beverly-townhouse" className="claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background">Beverly Hills</TabsTrigger>
              <TabsTrigger value="santa-monica-eco" className="claude-surface-hover data-[state=active]:claude-accent data-[state=active]:text-background">Santa Monica</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Events */}
        <div className="lg:col-span-2">
          <Card className="claude-surface claude-border">
            <CardHeader>
              <CardTitle className="flex items-center claude-text">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Timeline Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {index < filteredEvents.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 claude-border"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full claude-surface claude-border flex items-center justify-center">
                        {getStatusIcon(event.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold claude-text">{event.task}</h3>
                          <Badge className={getStatusColor(event.status)} variant="secondary">
                            {event.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm claude-text-muted space-y-1">
                          <div className="flex items-center">
                            <Home className="w-4 h-4 mr-2 claude-text-muted" />
                            {event.project} • {event.phase}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 claude-text-muted" />
                            {new Date(event.date).toLocaleDateString()} • {event.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 claude-text-muted" />
                            {event.team}
                          </div>
                          {event.dependencies.length > 0 && (
                            <div className="flex items-center">
                              <ArrowRight className="w-4 h-4 mr-2 claude-text-muted" />
                              Depends on: {event.dependencies.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Milestones */}
          <Card className="claude-surface claude-border">
            <CardHeader>
              <CardTitle className="flex items-center claude-text">
                <Clock className="w-5 h-5 mr-2 text-purple-400" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="border-l-4 border-purple-500/30 pl-4">
                    <h4 className="font-medium claude-text">{milestone.milestone}</h4>
                    <p className="text-sm claude-text-muted">{milestone.project}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm claude-text-muted">{milestone.date}</span>
                      <Badge variant="outline" className="text-xs claude-border claude-text-muted">
                        {milestone.daysLeft} days
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Path */}
          <Card className="claude-surface claude-border">
            <CardHeader>
              <CardTitle className="flex items-center claude-text">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Critical Path Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <h4 className="font-medium text-red-400">Electrical Permit Delay</h4>
                  <p className="text-sm text-red-300">Beverly Hills project delayed by 2 weeks</p>
                  <Button size="sm" variant="outline" className="mt-2 claude-border claude-text">
                    View Details
                  </Button>
                </div>
                
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-medium text-yellow-400">Material Delivery</h4>
                  <p className="text-sm text-yellow-300">Steel beams for Malibu project</p>
                  <Button size="sm" variant="outline" className="mt-2 claude-border claude-text">
                    Track Shipment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="claude-surface claude-border">
            <CardHeader>
              <CardTitle className="claude-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start claude-surface-hover claude-border claude-text">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start claude-surface-hover claude-border claude-text">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="w-full justify-start claude-surface-hover claude-border claude-text">
                <Users className="w-4 h-4 mr-2" />
                Update Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TimelineView