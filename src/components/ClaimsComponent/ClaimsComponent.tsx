import { useState } from 'react'
import { FileSpreadsheet, Filter, RefreshCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for pending claims
const pendingClaims = [
  { id: 'CL-001', claimant: 'John Doe', amount: 1200, category: 'Health', date: '2023-06-15' },
  { id: 'CL-002', claimant: 'Jane Smith', amount: 3500, category: 'Auto', date: '2023-06-14' },
  { id: 'CL-003', claimant: 'Bob Johnson', amount: 800, category: 'Travel', date: '2023-06-13' },
  { id: 'CL-004', claimant: 'Alice Brown', amount: 2000, category: 'Property', date: '2023-06-12' },
  { id: 'CL-005', claimant: 'Charlie Davis', amount: 1500, category: 'Health', date: '2023-06-11' },
]

export default function SettlePage() {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredClaims = pendingClaims.filter(claim => 
    claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || claim.category === filterCategory)
  )

  const handleSelectAll = () => {
    if (selectedClaims.length === filteredClaims.length) {
      setSelectedClaims([])
    } else {
      setSelectedClaims(filteredClaims.map(claim => claim.id))
    }
  }

  const handleSelectClaim = (claimId: string) => {
    if (selectedClaims.includes(claimId)) {
      setSelectedClaims(selectedClaims.filter(id => id !== claimId))
    } else {
      setSelectedClaims([...selectedClaims, claimId])
    }
  }

  const handleBulkSettle = () => {
    // Implement bulk settlement logic here
    console.log('Settling claims:', selectedClaims)
  }

  const handleDownloadExcel = () => {
    // Implement Excel download logic here
    console.log('Downloading approved claims as Excel')
  }

  const handleHDFCBankAPILink = () => {
    // Implement HDFC Bank API integration logic here
    console.log('Linking to HDFC Bank API for settlement')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settle Claims</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Auto">Auto</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Property">Property</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleDownloadExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Download Approved Claims
          </Button>
          <Button onClick={handleHDFCBankAPILink}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            HDFC Bank API Link
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Claims</CardTitle>
          <CardDescription>Review and settle pending claims</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedClaims.length === filteredClaims.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedClaims.includes(claim.id)}
                      onCheckedChange={() => handleSelectClaim(claim.id)}
                    />
                  </TableCell>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.claimant}</TableCell>
                  <TableCell>${claim.amount}</TableCell>
                  <TableCell>{claim.category}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Settle</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Settle Claim {claim.id}</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to settle this claim for ${claim.amount}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Settlement</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleBulkSettle} disabled={selectedClaims.length === 0}>
          Settle Selected Claims ({selectedClaims.length})
        </Button>
      </div>
    </div>
  )
}