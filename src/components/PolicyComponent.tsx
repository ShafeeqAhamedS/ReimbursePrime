import { useState } from 'react'
import { Plus, Edit, Trash2, Download, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

// Mock data for policies
const initialPolicies = [
  { id: 1, name: 'Travel Expense Policy', type: 'pdf', lastUpdated: '2023-06-15' },
  { id: 2, name: 'Professional Development Policy', type: 'docx', lastUpdated: '2023-05-20' },
  { id: 3, name: 'Product Licensing Policy', type: 'pdf', lastUpdated: '2023-04-10' },
]

export default function PolicyPage() {
  const [policies, setPolicies] = useState(initialPolicies)
  const [editingPolicy, setEditingPolicy] = useState<{ id: number; name: string; type: string; lastUpdated: string } | null>(null)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')

  const handleAddPolicy = (newPolicy: { name: string; type: string; lastUpdated: string }) => {
    setPolicies([...policies, { ...newPolicy, id: policies.length + 1 }])
  }

  const handleUpdatePolicy = (updatedPolicy: { id: number; name: string; type: string; lastUpdated: string }) => {
    setPolicies(policies.map(policy => policy.id === updatedPolicy.id ? updatedPolicy : policy))
  }

  const handleDeletePolicy = (id: number) => {
    setPolicies(policies.filter(policy => policy.id !== id))
  }

  const simulateAISuggestion = async () => {
    // This is a mock function. In a real application, you would call an AI API here.
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    return "Based on the policy content, consider adding clauses for remote work expenses and cybersecurity measures. Also, the language could be simplified in section 3 for better clarity."
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reimbursement Policies</h1>
      
      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingPolicy ? 'Edit Policy' : 'Add New Policy'}</DialogTitle>
              <DialogDescription>
                {editingPolicy ? 'Update the policy details below.' : 'Enter the details for the new policy.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const policyData = {
                name: formData.get('name') as string,
                type: formData.get('type') as string,
                lastUpdated: new Date().toISOString().split('T')[0]
              }
              if (editingPolicy) {
                handleUpdatePolicy({ ...policyData, id: editingPolicy.id })
              } else {
                handleAddPolicy(policyData)
              }
              setEditingPolicy(null)
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Policy Name
                  </Label>
                  <Input id="name" name="name" defaultValue={editingPolicy?.name ?? ''} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    File Type
                  </Label>
                  <Select name="type" defaultValue={editingPolicy?.type ?? 'pdf'}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Word Document</SelectItem>
                      <SelectItem value="txt">Text File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Upload File
                  </Label>
                  <Input id="file" name="file" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingPolicy ? 'Update Policy' : 'Add Policy'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={() => setIsAIDialogOpen(true)}>
          <Sparkles className="mr-2 h-4 w-4" />
          AI Policy Assistant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Policies</CardTitle>
          <CardDescription>Manage and update company policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id} className="hover:bg-[#E3194B]/10">
                  <TableCell>{policy.name}</TableCell>
                  <TableCell>{policy.type.toUpperCase()}</TableCell>
                  <TableCell>{policy.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeletePolicy(policy.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>AI Policy Assistant</DialogTitle>
            <DialogDescription>
              Upload a policy document to receive AI-powered suggestions and improvements.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ai-file" className="text-right">
                Upload Policy
              </Label>
              <Input id="ai-file" type="file" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ai-suggestion" className="text-right">
                AI Suggestion
              </Label>
              <Textarea
                id="ai-suggestion"
                placeholder="AI suggestions will appear here..."
                value={aiSuggestion}
                readOnly
                className="col-span-3"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={async () => {
              toast({
                title: "Analyzing policy...",
                description: "Please wait while our AI processes your document.",
              })
              const suggestion = await simulateAISuggestion()
              setAiSuggestion(suggestion)
              toast({
                title: "Analysis complete",
                description: "AI suggestions are now available.",
              })
            }}>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}