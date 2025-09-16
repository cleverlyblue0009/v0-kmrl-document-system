"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Upload,
  FileText,
  ImageIcon,
  FileIcon,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Folder,
  Tag,
} from "lucide-react"
import Link from "next/link"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
  aiCategory?: string
  confidence?: number
  extractedText?: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }, [])

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and AI processing
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const updateProgress = () => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + 10 }
            } else if (file.status === "uploading") {
              return {
                ...file,
                status: "processing",
                progress: 0,
              }
            } else if (file.status === "processing" && file.progress < 100) {
              return { ...file, progress: file.progress + 15 }
            } else {
              // AI classification results
              const categories = [
                "Financial Reports",
                "Safety Protocols",
                "Maintenance Records",
                "Passenger Feedback",
                "Operational Guidelines",
                "Legal Documents",
              ]
              const category = categories[Math.floor(Math.random() * categories.length)]
              const confidence = Math.floor(Math.random() * 20) + 80

              return {
                ...file,
                status: "completed",
                progress: 100,
                aiCategory: category,
                confidence,
                extractedText: "Sample extracted text preview...",
              }
            }
          }
          return file
        }),
      )
    }

    const interval = setInterval(() => {
      updateProgress()
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
    }, 8000)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />
    if (type.includes("pdf")) return <FileText className="w-5 h-5" />
    return <FileIcon className="w-5 h-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
                <h1 className="text-xl font-semibold text-slate-900">Document Upload</h1>
                <p className="text-sm text-slate-600">Bulk upload with AI classification</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{files.length} files</Badge>
              <Badge variant="outline">{files.filter((f) => f.status === "completed").length} processed</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:border-slate-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Drop files here or click to browse</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Supports PDF, DOC, DOCX, XLS, XLSX, and image files up to 10MB each
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button className="bg-blue-900 hover:bg-blue-800">Select Files</Button>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Upload Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                        <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                            <div className="flex items-center space-x-2">
                              {file.status === "uploading" && <Clock className="w-4 h-4 text-amber-500" />}
                              {file.status === "processing" && <Clock className="w-4 h-4 text-blue-500" />}
                              {file.status === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                              {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                              <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                            <span>{formatFileSize(file.size)}</span>
                            <span>
                              {file.status === "uploading" && "Uploading..."}
                              {file.status === "processing" && "AI Processing..."}
                              {file.status === "completed" && "Complete"}
                              {file.status === "error" && "Error"}
                            </span>
                          </div>
                          <Progress value={file.progress} className="h-2 mb-2" />
                          {file.aiCategory && (
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {file.aiCategory}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {file.confidence}% confidence
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Upload Settings & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Upload Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="auto-classify" className="text-sm font-medium text-slate-700">
                    Auto-classify documents
                  </Label>
                  <p className="text-xs text-slate-600 mt-1">Use AI to automatically categorize uploaded documents</p>
                </div>
                <div>
                  <Label htmlFor="extract-text" className="text-sm font-medium text-slate-700">
                    Extract text content
                  </Label>
                  <p className="text-xs text-slate-600 mt-1">Enable OCR for scanned documents and images</p>
                </div>
                <div>
                  <Label htmlFor="default-folder" className="text-sm font-medium text-slate-700">
                    Default folder
                  </Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Folder className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Uncategorized</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Files uploaded</span>
                  <span className="text-sm font-medium text-slate-900">{files.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Successfully processed</span>
                  <span className="text-sm font-medium text-slate-900">
                    {files.filter((f) => f.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">In progress</span>
                  <span className="text-sm font-medium text-slate-900">
                    {files.filter((f) => f.status === "uploading" || f.status === "processing").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total size</span>
                  <span className="text-sm font-medium text-slate-900">
                    {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">AI Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Financial Reports",
                    "Safety Protocols",
                    "Maintenance Records",
                    "Passenger Feedback",
                    "Operational Guidelines",
                    "Legal Documents",
                  ].map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{category}</span>
                      <Badge variant="outline" className="text-xs">
                        {files.filter((f) => f.aiCategory === category).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
