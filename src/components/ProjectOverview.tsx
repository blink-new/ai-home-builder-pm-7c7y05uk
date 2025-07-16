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
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'planning': return <Clock className="w-4 h-4 text-blue-600" />
      case 'foundation': return <Home className="w-4 h-4 text-orange-600" />
      case 'framing': return <BarChart3 className="w-4 h-4 text-purple-600" />
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Overview</h1>
          <p className="text-gray-600 mt-1">Monitor all your construction projects at a glance</p>
        </div>
        <Button>
          <Home className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2 text-blue-600" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-gray-600">{project.status}</span>
                        <Badge className={getPriorityColor(project.priority)} variant="secondary">
                          {project.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex justify-between text-sm pt-2">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-gray-600">{project.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-gray-600">{project.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Foundation completed</p>
                  <p className="text-xs text-gray-500">Malibu Villa • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Permit approved</p>
                  <p className="text-xs text-gray-500">Beverly Hills Townhouse • 5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Material delivery scheduled</p>
                  <p className="text-xs text-gray-500">Santa Monica Eco Home • 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Team meeting completed</p>
                  <p className="text-xs text-gray-500">All Projects • 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Budget review required</p>
                  <p className="text-xs text-gray-500">Malibu Villa • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">On-Time Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-green-600">87%</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <Progress value={87} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">+5% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-blue-600">92%</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <Progress value={92} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">5% under budget average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-purple-600">95%</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <Progress value={95} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">Excellent rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectOverview