'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  organization: string;
  posts: number;
  status: 'active' | 'closed' | 'draft';
  lastModified: string;
  applicants: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'UPSC CSE Exam 2024',
    organization: 'UPSC',
    posts: 1056,
    status: 'active',
    lastModified: '2024-05-28',
    applicants: 45230,
  },
  {
    id: '2',
    title: 'SSC CGL 2024',
    organization: 'SSC',
    posts: 1325,
    status: 'active',
    lastModified: '2024-05-27',
    applicants: 78910,
  },
  {
    id: '3',
    title: 'IBPS PO Recruitment',
    organization: 'IBPS',
    posts: 4336,
    status: 'draft',
    lastModified: '2024-05-25',
    applicants: 0,
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.organization.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage job postings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>Add a new government job posting to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="e.g., UPSC CSE Exam 2024" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Organization</label>
                <Input placeholder="e.g., UPSC" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Total Posts</label>
                  <Input type="number" placeholder="1000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Closing Date</label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Job Description</label>
                <textarea
                  className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Enter job description..."
                />
              </div>
              <Button onClick={() => setIsDialogOpen(false)} className="w-full">
                Create Job Posting
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title or organization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
          <CardDescription>Manage your job postings and track applicants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Job Title</th>
                  <th className="text-left py-3 px-4 font-medium">Organization</th>
                  <th className="text-left py-3 px-4 font-medium">Posts</th>
                  <th className="text-left py-3 px-4 font-medium">Applicants</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Modified</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">{job.title}</td>
                    <td className="py-3 px-4">{job.organization}</td>
                    <td className="py-3 px-4 font-medium">{job.posts}</td>
                    <td className="py-3 px-4">{job.applicants.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          job.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : job.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{job.lastModified}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(job.id)}
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
