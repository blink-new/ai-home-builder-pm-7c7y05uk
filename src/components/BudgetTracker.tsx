import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Home,
  Calendar,
  BarChart3,
  Plus,
  Download
} from 'lucide-react'

const BudgetTracker = () => {
  const [selectedProject, setSelectedProject] = useState('all')

  const budgetOverview = {
    totalBudget: 2400000,
    totalSpent: 1800000,
    totalRemaining: 600000,
    variance: -5 // negative means under budget
  }

  const projectBudgets = [
    {
      id: 'malibu-villa',
      name: 'Luxury Villa - Malibu',
      totalBudget: 850000,
      spent: 212500,
      remaining: 637500,
      progress: 25,
      variance: 2.5,
      status: 'on-track'
    },
    {
      id: 'beverly-townhouse',
      name: 'Modern Townhouse - Beverly Hills',
      totalBudget: 1200000,
      spent: 540000,
      remaining: 660000,
      progress: 45,
      variance: -3.2,
      status: 'under-budget'
    },
    {
      id: 'santa-monica-eco',
      name: 'Eco Home - Santa Monica',
      totalBudget: 650000,
      spent: 65000,
      remaining: 585000,
      progress: 10,
      variance: 0,
      status: 'on-track'
    }
  ]

  const expenseCategories = [
    {
      category: 'Materials',
      budgeted: 1200000,
      spent: 850000,
      percentage: 70.8,
      variance: -8.3
    },
    {
      category: 'Labor',
      budgeted: 800000,
      spent: 620000,
      percentage: 77.5,
      variance: -2.5
    },
    {
      category: 'Equipment',
      budgeted: 200000,
      spent: 180000,
      percentage: 90,
      variance: 5.0
    },
    {
      category: 'Permits & Fees',
      budgeted: 100000,
      spent: 85000,
      percentage: 85,
      variance: -15.0
    },
    {
      category: 'Subcontractors',
      budgeted: 100000,
      spent: 65000,
      percentage: 65,
      variance: -35.0
    }
  ]

  const recentExpenses = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Concrete delivery - Foundation',
      project: 'Malibu Villa',
      category: 'Materials',
      amount: 15000,
      status: 'approved'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Electrical rough-in labor',
      project: 'Beverly Hills Townhouse',
      category: 'Labor',
      amount: 8500,
      status: 'pending'
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Crane rental - 3 days',
      project: 'Malibu Villa',
      category: 'Equipment',
      amount: 4200,
      status: 'approved'
    },
    {
      id: 4,
      date: '2024-01-12',
      description: 'Building permit renewal',
      project: 'Santa Monica Eco',
      category: 'Permits & Fees',
      amount: 1200,
      status: 'approved'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-red-600'
    if (variance < -5) return 'text-green-600'
    return 'text-gray-600'
  }

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="w-4 h-4 text-red-600" />
    if (variance < 0) return <TrendingDown className="w-4 h-4 text-green-600" />
    return <CheckCircle2 className="w-4 h-4 text-gray-600" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-budget': return <Badge className="bg-green-100 text-green-800">Under Budget</Badge>
      case 'over-budget': return <Badge className="bg-red-100 text-red-800">Over Budget</Badge>
      case 'on-track': return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          <p className="text-gray-600 mt-1">Monitor expenses and financial performance across all projects</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.totalBudget)}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.totalSpent)}</p>
                <p className="text-sm text-gray-500">75% of budget</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(budgetOverview.totalRemaining)}</p>
                <p className="text-sm text-gray-500">25% remaining</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variance</p>
                <div className="flex items-center">
                  <p className={`text-2xl font-bold ${getVarianceColor(budgetOverview.variance)}`}>
                    {budgetOverview.variance > 0 ? '+' : ''}{budgetOverview.variance}%
                  </p>
                  <div className="ml-2">
                    {getVarianceIcon(budgetOverview.variance)}
                  </div>
                </div>
                <p className="text-sm text-green-600">Under budget</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingDown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Budgets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2 text-blue-600" />
              Project Budgets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectBudgets.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                      <div>
                        <span className="text-gray-600">Total Budget:</span>
                        <p className="font-medium">{formatCurrency(project.totalBudget)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Spent:</span>
                        <p className="font-medium">{formatCurrency(project.spent)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Remaining:</span>
                        <p className="font-medium text-green-600">{formatCurrency(project.remaining)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Variance:</span>
                        <div className="flex items-center">
                          <p className={`font-medium ${getVarianceColor(project.variance)}`}>
                            {project.variance > 0 ? '+' : ''}{project.variance}%
                          </p>
                          <div className="ml-1">
                            {getVarianceIcon(project.variance)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Expense Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                      </span>
                      <span className={`text-xs ${getVarianceColor(category.variance)}`}>
                        {category.variance > 0 ? '+' : ''}{category.variance}%
                      </span>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Recent Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{expense.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.project}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        variant={expense.status === 'approved' ? 'default' : 'secondary'}
                        className={expense.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {expense.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BudgetTracker