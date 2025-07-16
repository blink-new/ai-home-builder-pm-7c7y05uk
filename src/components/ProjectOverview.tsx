import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Home,
  BarChart3
} from 'lucide-react'

interface Stat {
  title: string
  value: string
  icon: any
  change: string
  color: string
}

interface Project {
  id: number
  name: string
  status: string
  progress: number
  budget: string
  timeline: string
  priority: string
}

interface ProjectOverviewProps {
  stats: Stat[]
  recentProjects: Project[]
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ stats, recentProjects }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'planning': return <Clock className="w-4 h-4 text-blue-400" />
      case 'foundation': return <Home className="w-4 h-4 text-orange-400" />
      case 'framing': return <BarChart3 className="w-4 h-4 text-purple-400" />
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold claude-text">Project Overview</h1>
          <p className="claude-text-muted mt-1">Monitor all your construction projects at a glance</p>
        </div>
        <Button className="claude-accent">
          <Home className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="claude-surface claude-border claude-surface-hover transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium claude-text-muted">{stat.title}</p>
                    <p className="text-2xl font-bold claude-text mt-1">{stat.value}</p>
                    <p className="text-sm claude-text-muted mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg claude-surface`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card className="claude-surface claude-border">
          <CardHeader>
            <CardTitle className="flex items-center claude-text">
              <Home className="w-5 h-5 mr-2 text-blue-400" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="claude-surface rounded-lg p-4 claude-surface-hover transition-colors claude-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold claude-text">{project.name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        {getStatusIcon(project.status)}
                        <span className="text-sm claude-text-muted">{project.status}</span>
                        <Badge className={getPriorityColor(project.priority)} variant="secondary">
                          {project.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="claude-text-muted">Progress</span>
                      <span className="font-medium claude-text">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex justify-between text-sm pt-2">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 claude-text-muted" />
                        <span className="claude-text-muted">{project.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 claude-text-muted" />
                        <span className="claude-text-muted">{project.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="claude-surface claude-border">
          <CardHeader>
            <CardTitle className="flex items-center claude-text">
              <Clock className="w-5 h-5 mr-2 text-green-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium claude-text">Foundation completed</p>
                  <p className="text-xs claude-text-muted">Malibu Villa • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium claude-text">Permit approved</p>
                  <p className="text-xs claude-text-muted">Beverly Hills Townhouse • 5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium claude-text">Material delivery scheduled</p>
                  <p className="text-xs claude-text-muted">Santa Monica Eco Home • 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium claude-text">Team meeting completed</p>
                  <p className="text-xs claude-text-muted">All Projects • 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium claude-text">Budget review required</p>
                  <p className="text-xs claude-text-muted">Malibu Villa • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="claude-surface claude-border">
          <CardHeader>
            <CardTitle className="text-lg claude-text">On-Time Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-green-400">87%</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <Progress value={87} className="h-2 mb-2" />
            <p className="text-sm claude-text-muted">+5% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="claude-surface claude-border">
          <CardHeader>
            <CardTitle className="text-lg claude-text">Budget Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-blue-400">92%</span>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <Progress value={92} className="h-2 mb-2" />
            <p className="text-sm claude-text-muted">5% under budget average</p>
          </CardContent>
        </Card>

        <Card className="claude-surface claude-border">
          <CardHeader>
            <CardTitle className="text-lg claude-text">Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-purple-400">95%</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <Progress value={95} className="h-2 mb-2" />
            <p className="text-sm claude-text-muted">Excellent rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectOverview