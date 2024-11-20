import { useState } from 'react'
import { Calendar, Download, Filter, Search, User, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for claim history
const claimHistory = [
  { id: 'CL001', applier: 'John Doe', approver: 'Alice Manager', amount: 1200, date: '2023-06-15', status: 'Approved' },
  { id: 'CL002', applier: 'Jane Smith', approver: 'Bob Supervisor', amount: 3500, date: '2023-06-14', status: 'Pending' },
  { id: 'CL003', applier: 'Mike Johnson', approver: 'Charlie Director', amount: 800, date: '2023-06-13', status: 'Rejected' },
  { id: 'CL004', applier: 'Sarah Brown', approver: 'David Executive', amount: 2000, date: '2023-06-12', status: 'Approved' },
  { id: 'CL005', applier: 'Tom Wilson', approver: 'Eve Manager', amount: 1500, date: '2023-06-11', status: 'Pending' },
]

// Mock data for the chart
const chartData = [
  { name: 'Jan', approved: 65, rejected: 20, pending: 15 },
  { name: 'Feb', approved: 59, rejected: 15, pending: 26 },
  { name: 'Mar', approved: 80, rejected: 10, pending: 10 },
  { name: 'Apr', approved: 81, rejected: 5, pending: 14 },
  { name: 'May', approved: 56, rejected: 24, pending: 20 },
  { name: 'Jun', approved: 55, rejected: 30, pending: 15 },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredHistory = claimHistory.filter(claim => 
    (claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     claim.applier.toLowerCase().includes(searchTerm.toLowerCase()) ||
     claim.approver.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || claim.status.toLowerCase() === filterType)
  )

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Claim History</h1>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Claim History</CardTitle>
              <CardDescription>View and manage all claim requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Input
                    placeholder="Search claims..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <DatePickerWithRange date={dateRange} setDate={setDateRange} /> */}
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Applier</TableHead>
                    <TableHead>Approver</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.id}</TableCell>
                      <TableCell>{claim.applier}</TableCell>
                      <TableCell>{claim.approver}</TableCell>
                      <TableCell>${claim.amount.toFixed(2)}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${claim.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {claim.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Claim Statistics</CardTitle>
              <CardDescription>Monthly overview of claim statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" stackId="a" fill="#4ade80" />
                  <Bar dataKey="rejected" stackId="a" fill="#f87171" />
                  <Bar dataKey="pending" stackId="a" fill="#fbbf24" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-4 mt-6">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
        <Button variant="outline">
          <User className="mr-2 h-4 w-4" />
          Applier Report
        </Button>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Approver Report
        </Button>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range Analysis
        </Button>
      </div>
    </div>
  )
}