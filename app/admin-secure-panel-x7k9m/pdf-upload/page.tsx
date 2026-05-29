'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, File, Trash2, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface PDF {
  id: string;
  name: string;
  type: 'Admit Card' | 'Answer Key' | 'Result' | 'Syllabus' | 'Notification';
  jobTitle: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'published' | 'error';
  downloadCount: number;
  extractedData?: {
    pages: number;
    keywords: string[];
  };
}

const mockPDFs: PDF[] = [
  {
    id: '1',
    name: 'UPSC CSE Admit Card 2024.pdf',
    type: 'Admit Card',
    jobTitle: 'UPSC CSE Exam 2024',
    size: '2.4 MB',
    uploadDate: '2024-05-28',
    status: 'published',
    downloadCount: 12450,
    extractedData: {
      pages: 156,
      keywords: ['roll number', 'examination date', 'admit card'],
    },
  },
  {
    id: '2',
    name: 'SSC CGL Answer Key.pdf',
    type: 'Answer Key',
    jobTitle: 'SSC CGL 2024',
    size: '1.8 MB',
    uploadDate: '2024-05-27',
    status: 'published',
    downloadCount: 8932,
    extractedData: {
      pages: 89,
      keywords: ['tier 1', 'answer key', 'question paper'],
    },
  },
  {
    id: '3',
    name: 'IBPS PO Notification.pdf',
    type: 'Notification',
    jobTitle: 'IBPS PO Recruitment',
    size: '3.2 MB',
    uploadDate: '2024-05-26',
    status: 'processing',
    downloadCount: 0,
    extractedData: {
      pages: 45,
      keywords: ['vacancy', 'eligibility', 'application'],
    },
  },
];

export default function PDFUpload() {
  const [pdfs, setPDFs] = useState<PDF[]>(mockPDFs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleDelete = (id: string) => {
    setPDFs(pdfs.filter(pdf => pdf.id !== id));
  };

  const handleUpload = () => {
    if (uploadFile) {
      const newPDF: PDF = {
        id: Date.now().toString(),
        name: uploadFile.name,
        type: 'Notification',
        jobTitle: 'New Job',
        size: (uploadFile.size / 1024 / 1024).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing',
        downloadCount: 0,
        extractedData: {
          pages: 0,
          keywords: [],
        },
      };
      setPDFs([newPDF, ...pdfs]);
      setUploadFile(null);
      setIsDialogOpen(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PDF Management</h1>
          <p className="text-muted-foreground mt-1">Upload and manage vacancy PDFs with automatic data extraction</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload PDF
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload PDF Document</DialogTitle>
              <DialogDescription>Upload job notifications, admit cards, answer keys, or results</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="Select job posting" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">PDF Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-1">
                  <option>Notification</option>
                  <option>Admit Card</option>
                  <option>Answer Key</option>
                  <option>Result</option>
                  <option>Syllabus</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">PDF File</label>
                <div className="mt-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById('file-input')?.click()}>
                  <File className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{uploadFile?.name || 'Click to upload or drag and drop'}</p>
                  <p className="text-xs text-muted-foreground">PDF files up to 50MB</p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <Button onClick={handleUpload} disabled={!uploadFile} className="w-full">
                Upload and Process
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pdfs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{pdfs.filter(p => p.status === 'published').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pdfs.reduce((sum, p) => sum + p.downloadCount, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* PDFs Table */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Documents</CardTitle>
          <CardDescription>Manage uploaded PDFs with automatic data extraction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">File Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Job</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Downloads</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((pdf) => (
                  <tr key={pdf.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{pdf.name}</span>
                    </td>
                    <td className="py-3 px-4">{pdf.type}</td>
                    <td className="py-3 px-4 text-sm">{pdf.jobTitle}</td>
                    <td className="py-3 px-4">{pdf.size}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(pdf.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(pdf.status)}
                          {pdf.status.charAt(0).toUpperCase() + pdf.status.slice(1)}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">{pdf.downloadCount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(pdf.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
