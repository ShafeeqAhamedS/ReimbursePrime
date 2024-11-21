import { useState } from 'react'
import { FileSpreadsheet, Calendar, RefreshCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

// Mock data for pending Reimbursements
const pendingReimbursements = [
  { id: 'CL-001', employee: 'John Doe', amount: 1200, category: 'Business Travel', date: '2023-06-15' },
  { id: 'CL-002', employee: 'Jane Smith', amount: 3500, category: 'Team Outing', date: '2023-06-14' },
  { id: 'CL-003', employee: 'Bob Johnson', amount: 800, category: 'Parking', date: '2023-06-13' },
  { id: 'CL-004', employee: 'Alice Brown', amount: 2000, category: 'Certification', date: '2023-06-12' },
  { id: 'CL-005', employee: 'Charlie Davis', amount: 1500, category: 'Certification', date: '2023-06-11' },
]

const pendingconfirmation = [
  { id: 'CL-001', employee: 'John Doe', amount: 1200, category: 'Business Travel', date: '2023-06-15' },
  { id: 'CL-005', employee: 'Charlie Davis', amount: 1500, category: 'Certification', date: '2023-06-11' },
]

export default function SettlePage() {
  const [selectedReimbursements, setSelectedReimbursements] = useState<string[]>([])
  const [selectedPendingConfirmations, setSelectedPendingConfirmations] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredReimbursements = pendingReimbursements.filter(claim => 
    claim.employee.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || claim.category === filterCategory)
  )

  const handleSelectAllReimbursements = () => {
    if (selectedReimbursements.length === filteredReimbursements.length) {
      setSelectedReimbursements([])
    } else {
      setSelectedReimbursements(filteredReimbursements.map(claim => claim.id))
    }
  }

  const handleSelectAllPendingConfirmations = () => {
    if (selectedPendingConfirmations.length === pendingconfirmation.length) {
      setSelectedPendingConfirmations([])
    } else {
      setSelectedPendingConfirmations(pendingconfirmation.map(claim => claim.id))
    }
  }

  const handleSelectReimbursement = (claimId: string) => {
    if (selectedReimbursements.includes(claimId)) {
      setSelectedReimbursements(selectedReimbursements.filter(id => id !== claimId))
    } else {
      setSelectedReimbursements([...selectedReimbursements, claimId])
    }
  }

  const handleSelectPendingConfirmation = (claimId: string) => {
    if (selectedPendingConfirmations.includes(claimId)) {
      setSelectedPendingConfirmations(selectedPendingConfirmations.filter(id => id !== claimId))
    } else {
      setSelectedPendingConfirmations([...selectedPendingConfirmations, claimId])
    }
  }

  const handleDownloadExcel = () => {
    // Implement Excel download logic here
    console.log('Downloading approved Reimbursements as Excel')
  }

  const handleHDFCBankAPILink = () => {
    // Implement HDFC Bank API integration logic here
    console.log('Linking to HDFC Bank API for settlement')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settle Reimbursements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Confirmation</CardTitle>
          <CardDescription>Review and confirm settled Reimbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedPendingConfirmations.length === pendingconfirmation.length}
                    onCheckedChange={handleSelectAllPendingConfirmations}
                  />
                </TableHead>
                <TableHead>Reimbursement ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingconfirmation.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPendingConfirmations.includes(claim.id)}
                      onCheckedChange={() => handleSelectPendingConfirmation(claim.id)}
                    />
                  </TableCell>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.employee}</TableCell>
                  <TableCell>₹{claim.amount}</TableCell>
                  <TableCell>{claim.category}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#E3194B]" disabled={selectedPendingConfirmations.length === 0}>
            Confirm Selected Reimbursements ({selectedPendingConfirmations.length})
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settle Selected Reimbursements</DialogTitle>
          </DialogHeader>
          <p>Number of claims to settle: {selectedPendingConfirmations.length}</p>
            <ol className="mb-4">
              {selectedPendingConfirmations.map(claimId => {
                const claim = pendingReimbursements.find(c => c.id === claimId)
                return (
                  <li key={claimId}>
                    {claim?.employee} - ₹{claim?.amount}
                  </li>
                )
              })}
            </ol>
            <div className="flex items-center justify-center space-x-2">
            <DialogClose asChild>
            <Button onClick={handleHDFCBankAPILink} type="submit">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Payment Initiated
              </Button>
            </DialogClose>
            </div>
          <DialogFooter>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>

      <div className="flex justify-between items-center my-6">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search Reimbursements..."
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
              <SelectItem value="Business Travel">Business Travel</SelectItem>
              <SelectItem value="Team Outing">Team Outing</SelectItem>
              <SelectItem value="Parking">Parking</SelectItem>
              <SelectItem value="Certification">Certification</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reimbursements Settlement Queue</CardTitle>
          <CardDescription>Review and settle pending Reimbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedReimbursements.length === filteredReimbursements.length}
                    onCheckedChange={handleSelectAllReimbursements}
                  />
                </TableHead>
                <TableHead>Reimbursement ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReimbursements.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedReimbursements.includes(claim.id)}
                      onCheckedChange={() => handleSelectReimbursement(claim.id)}
                    />
                  </TableCell>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.employee}</TableCell>
                  <TableCell>₹{claim.amount}</TableCell>
                  <TableCell>{claim.category}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={selectedReimbursements.length === 0}>
            Settle Selected Reimbursements ({selectedReimbursements.length})
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settle Selected Reimbursements</DialogTitle>
          </DialogHeader>
          <p>Number of claims to settle: {selectedReimbursements.length}</p>
            <ol className="mb-4">
              {selectedReimbursements.map(claimId => {
                const claim = pendingReimbursements.find(c => c.id === claimId)
                return (
                  <li key={claimId}>
                    {claim?.employee} - ₹{claim?.amount}
                  </li>
                )
              })}
            </ol>
            <div className="flex items-center justify-center space-x-2">
            <DialogClose asChild>
              <Button onClick={handleDownloadExcel} type="submit">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download as Excel
              </Button>
            </DialogClose>
            <DialogClose asChild>
            <Button onClick={handleHDFCBankAPILink} type="submit">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Settle with Bank
              </Button>
            </DialogClose>
            </div>
          <DialogFooter>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}