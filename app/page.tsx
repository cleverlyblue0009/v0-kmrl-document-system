import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  MessageSquare,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Database,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">KMRL Document System</h1>
                <p className="text-gray-500 mt-1">AI-Powered Document Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800 shadow-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-blue-900" />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-2">2,847</p>
                <p className="text-gray-600 text-sm">Total Documents</p>
                <p className="text-emerald-600 text-xs mt-2 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% this month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-2">23</p>
                <p className="text-gray-600 text-sm">Processing Queue</p>
                <p className="text-amber-600 text-xs mt-2">Avg 2.3 min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-2">94.2%</p>
                <p className="text-gray-600 text-sm">AI Accuracy</p>
                <p className="text-emerald-600 text-xs mt-2">High confidence</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-2">156</p>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-emerald-600 text-xs mt-2">+8 today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Recent Activity */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-light text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      action: "Document uploaded",
                      file: "Metro_Safety_Protocol_2024.pdf",
                      user: "Rajesh Kumar",
                      time: "2 min ago",
                      status: "processing",
                    },
                    {
                      action: "AI classification completed",
                      file: "Station_Maintenance_Report.docx",
                      user: "Priya Nair",
                      time: "5 min ago",
                      status: "completed",
                      confidence: 96,
                    },
                    {
                      action: "Document uploaded",
                      file: "Passenger_Feedback_Analysis.xlsx",
                      user: "Arun Menon",
                      time: "12 min ago",
                      status: "completed",
                      confidence: 89,
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.status === "processing" ? "bg-amber-50" : "bg-emerald-50"
                          }`}
                        >
                          {activity.status === "processing" ? (
                            <Clock className="w-5 h-5 text-amber-600" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500 mt-1">{activity.file}</p>
                          <p className="text-xs text-gray-400">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                      {activity.confidence && (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0">
                          {activity.confidence}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-light text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-12 justify-start bg-blue-900 hover:bg-blue-800 text-left">
                  <Upload className="w-5 h-5 mr-3" />
                  Upload Documents
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start border-gray-200 hover:bg-gray-50 bg-transparent"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Ask AI Assistant
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start border-gray-200 hover:bg-gray-50 bg-transparent"
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-light text-gray-900">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">AI Classification</span>
                    <span className="text-gray-900 font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">OCR Processing</span>
                    <span className="text-gray-900 font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    23 documents in queue
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
