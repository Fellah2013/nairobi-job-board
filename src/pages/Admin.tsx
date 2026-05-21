import { useState } from 'react';
import { MOCK_JOBS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Check, X, Star, Trash2, LayoutDashboard, Search, Eye } from 'lucide-react';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export default function Admin() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status } : job));
    toast.success(`Job ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  const handleToggleFeatured = (id: string) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, isFeatured: !job.isFeatured } : job));
    toast.success('Job featured status updated');
  };

  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    toast.success('Job deleted successfully');
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-black">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground font-medium">Manage job listings and moderations</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search jobs..." 
              className="pl-10 h-10 rounded-xl bg-white border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Total Posts</p>
            <p className="text-3xl font-black">{jobs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Pending Approval</p>
            <p className="text-3xl font-black text-amber-500">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Featured Jobs</p>
            <p className="text-3xl font-black text-blue-500">
              {jobs.filter(j => j.isFeatured).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Total Revenue</p>
            <p className="text-3xl font-black text-emerald-500">KSh 12,450</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold">Job Title</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Location</TableHead>
                <TableHead className="font-bold">Pay</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{job.title}</span>
                      <span className="text-xs text-muted-foreground">{job.company || 'Private'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {job.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{job.area}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-bold">KSh {job.payAmount}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      job.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border-none' :
                      job.status === 'rejected' ? 'bg-red-100 text-red-700 border-none' :
                      'bg-amber-100 text-amber-700 border-none'
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className={`h-8 w-8 ${job.isFeatured ? 'text-orange-500' : 'text-slate-300'}`}
                        onClick={() => handleToggleFeatured(job.id)}
                      >
                        <Star className={`w-4 h-4 ${job.isFeatured ? 'fill-orange-500' : ''}`} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-emerald-500"
                        onClick={() => handleStatusChange(job.id, 'approved')}
                        disabled={job.status === 'approved'}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}