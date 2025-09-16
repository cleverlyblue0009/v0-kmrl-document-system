"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LucidePieChart,
  Activity,
  Calendar,
  Download,
  Filter,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
} from "recharts"

const uploadTrendData = [
  { month: "Jul", uploads: 245, processed: 238, errors: 7 },
  { month: "Aug", uploads: 312, processed: 305, errors: 7 },
  { month: "Sep", uploads: 428, processed: 415, errors: 13 },
  { month: "Oct", uploads: 389, processed: 378, errors: 11 },
  { month: "Nov", uploads: 467, processed: 452, errors: 15 },
  { month: "Dec", uploads: 523, processed: 508, errors: 15 },
  { month: "Jan", uploads: 612, processed: 595, errors: 17 },
]

const categoryData = [
  { name: "Financial Reports", value: 28, color: "#1e40af" },
  { name: "Safety Protocols", value: 22, color: "#059669" },
  { name: "Maintenance Records", value: 18, color: "#d97706" },
  { name: "Passenger Feedback", value: 15, color: "#7c3aed" },
  { name: "Operational Guidelines", value: 12, color: "#dc2626" },
  { name: "Legal Documents", value: 5, color: "#6b7280" },
]

const processingTimeData = [
  { hour: "00:00", avgTime: 2.1 },
  { hour: "04:00", avgTime: 1.8 },
  { hour: "08:00", avgTime: 3.2 },
  { hour: "12:00", avgTime: 4.1 },
  { hour: "16:00", avgTime: 3.8 },
  { hour: "20:00", avgTime: 2.9 },
]

const userActivityData = [
  { day: "Mon", uploads: 45, queries: 128 },
  { day: "Tue", uploads: 52, queries: 142 },
  { day: "Wed", uploads: 38, queries: 98 },
  { day: "Thu", uploads: 61, queries: 156 },
  { day: "Fri", uploads: 48, queries: 134 },
  { day: "Sat", uploads: 23, queries: 67 },
  { day: "Sun", uploads: 18, queries: 45 },
]

export default function AnalyticsPage() {
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
                <h1 className="text-xl font-semibold text-slate-900">Analytics Dashboard</h1>
                <p className="text-sm text-slate-600">Document processing insights and metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Processing Accuracy</p>
                  <p className="text-2xl font-bold text-slate-900">94.2%</p>
                  <p className="text-xs text-emerald-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Processing Time</p>
                  <p className="text-2xl font-bold text-slate-900">2.3 min</p>
                  <p className="text-xs text-emerald-600 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -0.4 min improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Uploads</p>
                  <p className="text-2xl font-bold text-slate-900">612</p>
                  <p className="text-xs text-emerald-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +17% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Error Rate</p>
                  <p className="text-2xl font-bold text-slate-900">2.8%</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.3% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <LucidePieChart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Upload Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={uploadTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uploads"
                    stroke="#1e40af"
                    fill="#1e40af"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stroke="#059669"
                    fill="#059669"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Document Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Document Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-600">{item.name}</span>
                    <span className="text-xs font-medium text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Processing Time by Hour */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Processing Time by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#d97706"
                    strokeWidth={3}
                    dot={{ fill: "#d97706", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Weekly User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="uploads" fill="#1e40af" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="queries" fill="#7c3aed" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">AI Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Classification Accuracy</span>
                  <span className="text-slate-900">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">OCR Accuracy</span>
                  <span className="text-slate-900">91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Text Extraction</span>
                  <span className="text-slate-900">96.5%</span>
                </div>
                <Progress value={96.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Query Response</span>
                  <span className="text-slate-900">89.3%</span>
                </div>
                <Progress value={89.3} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Server Uptime</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  99.9%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Response Time</span>
                <Badge variant="secondary">1.2s avg</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Storage Usage</span>
                <Badge variant="secondary">67% (2.1TB)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Users</span>
                <Badge variant="secondary">156 online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Queue Status</span>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  23 pending
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-medium text-amber-800">High Processing Load</p>
                <p className="text-xs text-amber-600">Queue time increased to 4.2 min</p>
                <p className="text-xs text-amber-500">2 hours ago</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm font-medium text-emerald-800">Accuracy Improved</p>
                <p className="text-xs text-emerald-600">AI model updated successfully</p>
                <p className="text-xs text-emerald-500">1 day ago</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Storage Milestone</p>
                <p className="text-xs text-blue-600">Reached 10,000 documents</p>
                <p className="text-xs text-blue-500">3 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
