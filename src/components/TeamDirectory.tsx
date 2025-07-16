import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Filter
} from 'lucide-react'

const TeamDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  const teamMembers = [
    {
      id: 1,
      name: 'Mike Rodriguez',
      role: 'Electrical Contractor',
      company: 'Rodriguez Electric',
      phone: '(555) 123-4567',
      email: 'mike@rodriguezelectric.com',
      location: 'Los Angeles, CA',
      status: 'active',
      currentProject: 'Malibu Villa',
      availability: 'Available',
      rating: 4.9,
      completedProjects: 15,
      specialties: ['Residential Wiring', 'Smart Home Systems', 'Solar Installation']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Project Manager',
      company: 'FutureBuild AI',
      phone: '(555) 234-5678',
      email: 'sarah.chen@futurebuild.ai',
      location: 'Beverly Hills, CA',
      status: 'active',
      currentProject: 'Beverly Hills Townhouse',
      availability: 'Busy',
      rating: 4.8,
      completedProjects: 28,
      specialties: ['Project Coordination', 'Timeline Management', 'Client Relations']
    },
    {
      id: 3,
      name: 'David Thompson',
      role: 'Plumbing Contractor',
      company: 'Thompson Plumbing',
      phone: '(555) 345-6789',
      email: 'david@thompsonplumbing.com',
      location: 'Santa Monica, CA',
      status: 'active',
      currentProject: 'Santa Monica Eco',
      availability: 'Available',
      rating: 4.7,
      completedProjects: 22,
      specialties: ['Eco-Friendly Systems', 'Radiant Heating', 'Water Filtration']
    },
    {
      id: 4,
      name: 'Maria Gonzalez',
      role: 'Framing Contractor',
      company: 'Gonzalez Construction',
      phone: '(555) 456-7890',
      email: 'maria@gonzalezconstruction.com',
      location: 'Malibu, CA',
      status: 'active',
      currentProject: 'Malibu Villa',
      availability: 'Available',
      rating: 4.9,
      completedProjects: 31,
      specialties: ['Steel Framing', 'Custom Carpentry', 'Structural Work']
    },
    {
      id: 5,
      name: 'James Wilson',
      role: 'HVAC Contractor',
      company: 'Wilson Climate Control',
      phone: '(555) 567-8901',
      email: 'james@wilsonclimate.com',
      location: 'West Hollywood, CA',
      status: 'inactive',
      currentProject: null,
      availability: 'On Leave',
      rating: 4.6,
      completedProjects: 18,
      specialties: ['Energy Efficient Systems', 'Zoned Climate Control', 'Air Quality']
    },
    {
      id: 6,
      name: 'Lisa Park',
      role: 'Interior Designer',
      company: 'Park Design Studio',
      phone: '(555) 678-9012',
      email: 'lisa@parkdesign.com',
      location: 'Beverly Hills, CA',
      status: 'active',
      currentProject: 'Beverly Hills Townhouse',
      availability: 'Available',
      rating: 4.8,
      completedProjects: 12,
      specialties: ['Luxury Interiors', 'Sustainable Design', 'Smart Home Integration']
    }
  ]

  const upcomingSchedule = [
    {
      id: 1,
      member: 'Mike Rodriguez',
      project: 'Malibu Villa',
      task: 'Electrical Rough-in',
      date: '2024-01-18',
      time: '8:00 AM - 5:00 PM'
    },
    {
      id: 2,
      member: 'Maria Gonzalez',
      project: 'Beverly Hills Townhouse',
      task: 'Second Floor Framing',
      date: '2024-01-19',
      time: '7:00 AM - 4:00 PM'
    },
    {
      id: 3,
      member: 'David Thompson',
      project: 'Santa Monica Eco',
      task: 'Plumbing Layout Review',
      date: '2024-01-20',
      time: '10:00 AM - 2:00 PM'
    },
    {
      id: 4,
      member: 'Lisa Park',
      project: 'Beverly Hills Townhouse',
      task: 'Interior Design Consultation',
      date: '2024-01-22',
      time: '1:00 PM - 4:00 PM'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'text-green-600'
      case 'Busy': return 'text-yellow-600'
      case 'On Leave': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase().includes(selectedRole.toLowerCase())
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Directory</h1>
          <p className="text-gray-600 mt-1">Manage your construction team and contractor network</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedRole} onValueChange={setSelectedRole}>
              <TabsList>
                <TabsTrigger value="all">All Roles</TabsTrigger>
                <TabsTrigger value="contractor">Contractors</TabsTrigger>
                <TabsTrigger value="manager">Managers</TabsTrigger>
                <TabsTrigger value="designer">Designers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Team Members ({filteredMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-sm text-gray-500">{member.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getStatusColor(member.status)} variant="secondary">
                          {member.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getAvailabilityColor(member.availability)}`}>
                          {member.availability}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{member.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium">⭐ {member.rating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects:</span>
                          <span className="font-medium">{member.completedProjects}</span>
                        </div>
                        {member.currentProject && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current:</span>
                            <span className="font-medium text-blue-600">{member.currentProject}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Team Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active</span>
                  <Badge className="bg-green-100 text-green-800">20</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available</span>
                  <Badge className="bg-blue-100 text-blue-800">15</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">On Projects</span>
                  <Badge className="bg-yellow-100 text-yellow-800">18</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSchedule.map((item) => (
                  <div key={item.id} className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-medium text-gray-900">{item.member}</h4>
                    <p className="text-sm text-gray-600">{item.task}</p>
                    <p className="text-sm text-blue-600">{item.project}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Update
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Team Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TeamDirectory