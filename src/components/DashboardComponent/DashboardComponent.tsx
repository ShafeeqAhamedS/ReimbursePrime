import { CreditCard, FileText, PieChart, Clock, Bell, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function EnhancedReimbursementsDashboard() {
  const searchTerm =''
  const filterType = 'all'

  const ReimbursementsByCategory = [
    { name: 'Parking', value: 400 },
    { name: 'Certification', value: 300 },
    { name: 'Team Outings', value: 200 },
    { name: 'Business Travel', value: 100 },
  ]

  const claimHistory = [
    { id: 'CL001', employee: 'John Doe', amount: 1200, date: '2023-06-15', status: 'Approved' },
    { id: 'CL002', employee: 'Jane Smith', amount: 3500, date: '2023-06-14', status: 'Pending' },
    { id: 'CL003', employee: 'Mike Johnson', amount: 800, date: '2023-06-13', status: 'Rejected' },
  ]

  const filteredHistory = claimHistory.filter(claim => 
    (claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     claim.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (filterType === 'all' || claim.status.toLowerCase() === filterType)
  ))

  const ReimbursementsTrend = [
    { name: 'Jan', Reimbursements: 65 },
    { name: 'Feb', Reimbursements: 59 },
    { name: 'Mar', Reimbursements: 80 },
    { name: 'Apr', Reimbursements: 81 },
    { name: 'May', Reimbursements: 56 },
    { name: 'Jun', Reimbursements: 55 },
  ]

  return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <header className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome, Tulasiram Balla !!!</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <a href="https://shafeeqahamed.atlassian.net/servicedesk/customer/portal/1" target="_blank" rel="noreferrer">
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" /> Employee Portal 
                </Button>
              </a>
            </div>
          </header>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reimbursements</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#E3194B]">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reimbursements</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">56</div>
                <p className="text-xs text-muted-foreground">-3.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Settled Reimbursements</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">987</div>
                <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Settlement Time</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2 days</div>
                <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reimbursements by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Reimbursements",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px] w-[90%]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={ReimbursementsByCategory}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reimbursements Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    Reimbursements: {
                      label: "Reimbursements",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px] w-[90%]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ReimbursementsTrend}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="Reimbursements" stroke="var(--color-Reimbursements)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reimbursements Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reimbursements</CardTitle>
              <CardDescription>A list of recent Reimbursements and their current status.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Applier</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.id}</TableCell>
                      <TableCell>{claim.employee}</TableCell>
                      <TableCell>₹{claim.amount.toFixed(2)}</TableCell>
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
        </div>
      </main>
  )
}