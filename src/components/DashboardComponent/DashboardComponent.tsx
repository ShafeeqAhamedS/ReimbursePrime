import { CreditCard, FileText, PieChart, Clock, Bell, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function EnhancedClaimsDashboard() {

  const claimsByCategory = [
    { name: 'Health', value: 400 },
    { name: 'Auto', value: 300 },
    { name: 'Property', value: 200 },
    { name: 'Travel', value: 100 },
  ]

  const claimsTrend = [
    { name: 'Jan', claims: 65 },
    { name: 'Feb', claims: 59 },
    { name: 'Mar', claims: 80 },
    { name: 'Apr', claims: 81 },
    { name: 'May', claims: 56 },
    { name: 'Jun', claims: 55 },
  ]

  return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <header className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" /> New Claim
              </Button>
            </div>
          </header>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-coral">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">56</div>
                <p className="text-xs text-muted-foreground">-3.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Settled Claims</CardTitle>
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
                <CardTitle>Claims by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Claims",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={claimsByCategory}>
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
                <CardTitle>Claims Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    claims: {
                      label: "Claims",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={claimsTrend}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="claims" stroke="var(--color-claims)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>A list of recent claims and their current status.</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2">Claim ID</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">CL-001</td>
                    <td className="py-2">Health</td>
                    <td className="py-2">$1,200</td>
                    <td className="py-2 text-yellow-500">Pending</td>
                    <td className="py-2 w-[100px]"><Progress value={33} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">CL-002</td>
                    <td className="py-2">Auto</td>
                    <td className="py-2">$3,500</td>
                    <td className="py-2 text-green-500">Approved</td>
                    <td className="py-2 w-[100px]"><Progress value={100} /></td>
                  </tr>
                  <tr>
                    <td className="py-2">CL-003</td>
                    <td className="py-2">Travel</td>
                    <td className="py-2">$800</td>
                    <td className="py-2 text-blue-500">Under Review</td>
                    <td className="py-2 w-[100px]"><Progress value={66} /></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
  )
}