import { useState } from 'react'
import { Eye, Download, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for payment vouchers
const initialVouchers = [
  { id: 'PV001', claimId: 'CL001', amount: 1200, date: '2023-06-15', status: 'Paid' },
  { id: 'PV002', claimId: 'CL002', amount: 3500, date: '2023-06-14', status: 'Pending' },
  { id: 'PV003', claimId: 'CL003', amount: 800, date: '2023-06-13', status: 'Paid' },
  { id: 'PV004', claimId: 'CL004', amount: 2000, date: '2023-06-12', status: 'Processing' },
]

type Voucher = {
  id: string;
  claimId: string;
  amount: number;
  date: string;
  status: string;
};

export default function PaymentVouchersPage() {
  const vouchers = initialVouchers
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([])

  const filteredVouchers = vouchers.filter(voucher => 
    voucher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.claimId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher)
  }

  const handleSelectAllVouchers = () => {
    if (selectedVouchers.length === filteredVouchers.length) {
      setSelectedVouchers([])
    } else {
      setSelectedVouchers(filteredVouchers.map(voucher => voucher.id))
    }
  }

  const handleSelectVoucher = (voucherId: string) => {
    if (selectedVouchers.includes(voucherId)) {
      setSelectedVouchers(selectedVouchers.filter(id => id !== voucherId))
    } else {
      setSelectedVouchers([...selectedVouchers, voucherId])
    }
  }

  const handleBulkDownload = () => {
    // Implement bulk download logic here
    console.log('Downloading selected vouchers:', selectedVouchers)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Payment Vouchers</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search vouchers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Vouchers</CardTitle>
          <CardDescription>Manage and view payment vouchers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedVouchers.length === filteredVouchers.length}
                    onCheckedChange={handleSelectAllVouchers}
                  />
                </TableHead>
                <TableHead>Voucher ID</TableHead>
                <TableHead>Reimbursement ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVouchers.map((voucher) => (
                <TableRow key={voucher.id} className="hover:bg-[#E3194B]/10">
                  <TableCell>
                    <Checkbox
                      checked={selectedVouchers.includes(voucher.id)}
                      onCheckedChange={() => handleSelectVoucher(voucher.id)}
                    />
                  </TableCell>
                  <TableCell>{voucher.id}</TableCell>
                  <TableCell>{voucher.claimId}</TableCell>
                  <TableCell>${voucher.amount.toFixed(2)}</TableCell>
                  <TableCell>{voucher.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewVoucher(voucher)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleBulkDownload} disabled={selectedVouchers.length === 0}>
          Download Selected Vouchers ({selectedVouchers.length})
        </Button>
      </div>

      {selectedVoucher && (
        <Dialog open={!!selectedVoucher} onOpenChange={() => setSelectedVoucher(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment Voucher Details</DialogTitle>
            </DialogHeader>
            <div className="border-2 border-gray-200 p-6 rounded-lg">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Payment Voucher</h2>
                <p className="text-gray-600">Voucher ID: {selectedVoucher.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Reimbursement ID:</p>
                  <p>{selectedVoucher.claimId}</p>
                </div>
                <div>
                  <p className="font-semibold">Amount:</p>
                  <p>${selectedVoucher.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-semibold">Date:</p>
                  <p>{selectedVoucher.date}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Proof of Payment:</p>
                <div className="border border-gray-300 rounded p-2 mt-2">
                  [Placeholder for uploaded receipt or proof of payment]
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">This voucher serves as proof of payment for the above claim.</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedVoucher(null)}>Close</Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Voucher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}