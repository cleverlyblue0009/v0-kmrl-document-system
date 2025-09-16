"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  MoreHorizontal,
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Star,
  Grid3X3,
  List,
  SortAsc,
  Folder,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  uploadedBy: string
  aiCategory: string
  confidence: number
  tags: string[]
  status: "processed" | "processing" | "error"
  preview?: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Metro_Safety_Protocol_2024.pdf",
    type: "PDF",
    size: 2456789,
    uploadDate: "2024-01-15",
    uploadedBy: "Rajesh Kumar",
    aiCategory: "Safety Protocols",
    confidence: 96,
    tags: ["safety", "protocol", "2024"],
    status: "processed",
  },
  {
    id: "2",
    name: "Station_Maintenance_Report.docx",
    type: "DOCX",
    size: 1234567,
    uploadDate: "2024-01-14",
    uploadedBy: "Priya Nair",
    aiCategory: "Maintenance Records",
    confidence: 89,
    tags: ["maintenance", "station", "report"],
    status: "processed",
  },
  {
    id: "3",
    name: "Passenger_Feedback_Analysis.xlsx",
    type: "XLSX",
    size: 987654,
    uploadDate: "2024-01-13",
    uploadedBy: "Arun Menon",
    aiCategory: "Passenger Feedback",
    confidence: 92,
    tags: ["feedback", "analysis", "passenger"],
    status: "processed",
  },
  {
    id: "4",
    name: "Financial_Report_Q4_2023.pdf",
    type: "PDF",
    size: 3456789,
    uploadDate: "2024-01-12",
    uploadedBy: "Lakshmi Pillai",
    aiCategory: "Financial Reports",
    confidence: 94,
    tags: ["financial", "Q4", "2023"],
    status: "processed",
  },
  {
    id: "5",
    name: "Emergency_Response_Guidelines.pdf",
    type: "PDF",
    size: 1876543,
    uploadDate: "2024-01-11",
    uploadedBy: "Suresh Nair",
    aiCategory: "Operational Guidelines",
    confidence: 88,
    tags: ["emergency", "response", "guidelines"],
    status: "processed",
  },
  {
    id: "6",
    name: "Legal_Compliance_Checklist.docx",
    type: "DOCX",
    size: 654321,
    uploadDate: "2024-01-10",
    uploadedBy: "Maya Krishnan",
    aiCategory: "Legal Documents",
    confidence: 91,
    tags: ["legal", "compliance", "checklist"],
    status: "processed",
  },
]

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState("date")

  const categories = [
    "All",
    "Financial Reports",
    "Safety Protocols",
    "Maintenance Records",
    "Passenger Feedback",
    "Operational Guidelines",
    "Legal Documents",
  ]

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || doc.aiCategory === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-emerald-600 bg-emerald-100"
    if (confidence >= 80) return "text-amber-600 bg-amber-100"
    return "text-red-600 bg-red-100"
  }

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
                <h1 className="text-xl font-semibold text-slate-900">Document Library</h1>
                <p className="text-sm text-slate-600">AI-organized document collection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{filteredDocuments.length} documents</Badge>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-900 font-medium"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge variant="outline" className="text-xs">
                        {category === "All"
                          ? mockDocuments.length
                          : mockDocuments.filter((doc) => doc.aiCategory === category).length}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total documents</span>
                  <span className="text-sm font-medium text-slate-900">{mockDocuments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">High confidence</span>
                  <span className="text-sm font-medium text-slate-900">
                    {mockDocuments.filter((doc) => doc.confidence >= 90).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">This week</span>
                  <span className="text-sm font-medium text-slate-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total size</span>
                  <span className="text-sm font-medium text-slate-900">
                    {formatFileSize(mockDocuments.reduce((acc, doc) => acc + doc.size, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search & Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search documents, tags, or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <SortAsc className="w-4 h-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {selectedCategory === "All" ? "All Documents" : selectedCategory}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-900" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-slate-900 truncate">{doc.name}</h3>
                          <div className="flex items-center space-x-2">
                            {doc.status === "processed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            {doc.status === "processing" && (
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                            {doc.status === "error" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-slate-600 mb-2">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(doc.uploadDate)}
                          </span>
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {doc.uploadedBy}
                          </span>
                          <span>{formatFileSize(doc.size)}</span>
                          <span className="uppercase font-medium">{doc.type}</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {doc.aiCategory}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getConfidenceColor(doc.confidence)}`}>
                            {doc.confidence}% confidence
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-12">
                    <Folder className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
                    <p className="text-sm text-slate-600">Try adjusting your search terms or category filter</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
