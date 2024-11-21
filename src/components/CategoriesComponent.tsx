import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for categories
const initialCategories = [
  { id: 1, name: 'Business Travel', approvals: 2, cfoApproval: true, preRequestNeeded: false, approvalType: 'forced', approvalGroup: 'medical' },
  { id: 2, name: 'Team Outing', approvals: 1, cfoApproval: false, preRequestNeeded: true, approvalType: 'user', approvalGroup: null },
  { id: 3, name: 'Parking', approvals: 1, cfoApproval: false, preRequestNeeded: false, approvalType: 'user', approvalGroup: null },
  { id: 4, name: 'Certification', approvals: 3, cfoApproval: true, preRequestNeeded: true, approvalType: 'forced', approvalGroup: 'realestate' },
]

// Mock data for approval groups
const approvalGroups = ['general', 'tech', 'finance', 'ETFM', 'WFM']

type Category = {
  id: number;
  name: string;
  approvals: number;
  cfoApproval: boolean;
  preRequestNeeded: boolean;
  approvalType: string;
  approvalGroup: string | null;
};

export default function EnhancedCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    id: 0,
    name: '',
    approvals: 1,
    cfoApproval: false,
    preRequestNeeded: false,
    approvalType: 'user',
    approvalGroup: null
  });

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => cat.id === editingCategory.id ? editingCategory : cat));
      setEditingCategory(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddCategory = () => {
    const id = Math.max(...categories.map(cat => cat.id)) + 1;
    setCategories([...categories, { ...newCategory, id }]);
    setNewCategory({
      id: 0,
      name: '',
      approvals: 1,
      cfoApproval: false,
      preRequestNeeded: false,
      approvalType: 'user',
      approvalGroup: null
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reimbursement Categories</h1>
      <div className="mt-4 flex justify-start py-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new reimbursement category with custom approval settings</DialogDescription>
          </DialogHeader>
          <CardContent>
            {/* Form here */}
            <div className="p-6 bg-white rounded-md shadow-md max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create New Category</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="category-approvals">Number of Approvals</Label>
            <Select
              value={newCategory.approvals.toString()}
              onValueChange={(value) => setNewCategory({ ...newCategory, approvals: parseInt(value) })}
            >
              <SelectTrigger id="category-approvals" className="w-full">
                <SelectValue placeholder="Select approvals" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch
              id="cfo-approval"
              checked={newCategory.cfoApproval}
              onCheckedChange={(checked) => setNewCategory({ ...newCategory, cfoApproval: checked })}
            />
            <Label htmlFor="cfo-approval">CFO Approval Needed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pre-request"
              checked={newCategory.preRequestNeeded}
              onCheckedChange={(checked) => setNewCategory({ ...newCategory, preRequestNeeded: checked })}
            />
            <Label htmlFor="pre-request">Pre-Request Needed</Label>
          </div>
        </div>

        <div>
          <Label>Approval Type</Label>
          <RadioGroup
            value={newCategory.approvalType}
            onValueChange={(value) => setNewCategory({ ...newCategory, approvalType: value, approvalGroup: value === 'user' ? null : newCategory.approvalGroup })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="approval-user" />
              <Label htmlFor="approval-user">User Choice</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="forced" id="approval-forced" />
              <Label htmlFor="approval-forced">Forced by System</Label>
            </div>
          </RadioGroup>
        </div>

        {newCategory.approvalType === 'forced' && (
          <div>
            <Label htmlFor="approval-group">Approval Group</Label>
            <Select
              value={newCategory.approvalGroup || ''}
              onValueChange={(value) => setNewCategory({ ...newCategory, approvalGroup: value })}
            >
              <SelectTrigger id="approval-group" className="w-full">
                <SelectValue placeholder="Select approval group" />
              </SelectTrigger>
              <SelectContent>
                {approvalGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
          </CardContent>
          <DialogFooter>
          <DialogClose asChild>
          <Button
          onClick={handleAddCategory}
          disabled={!newCategory.name || (newCategory.approvalType === 'forced' && !newCategory.approvalGroup)}
          className="w-full mt-4"
          type="submit"
        >
          Add Category
        </Button>       
        </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage and edit existing reimbursement categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Number of Approvals</TableHead>
                <TableHead>CFO Approval</TableHead>
                <TableHead>Pre-Request</TableHead>
                <TableHead>Approval Type</TableHead>
                <TableHead>Approval Group</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-[#E3194B]/10">
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <Input
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <Select
                        value={editingCategory.approvals.toString()}
                        onValueChange={(value) => setEditingCategory({ ...editingCategory, approvals: parseInt(value) })}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      category.approvals
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <Switch
                        checked={editingCategory.cfoApproval}
                        onCheckedChange={(checked) => setEditingCategory({ ...editingCategory, cfoApproval: checked })}
                      />
                    ) : (
                      category.cfoApproval ? <Check className="text-green-500" /> : <X className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <Switch
                        checked={editingCategory.preRequestNeeded}
                        onCheckedChange={(checked) => setEditingCategory({ ...editingCategory, preRequestNeeded: checked })}
                      />
                    ) : (
                      category.preRequestNeeded ? <Check className="text-green-500" /> : <X className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <RadioGroup
                        value={editingCategory.approvalType}
                        onValueChange={(value) => setEditingCategory({ ...editingCategory, approvalType: value, approvalGroup: value === 'user' ? null : editingCategory.approvalGroup })}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="user" id={`edit-approval-user-${category.id}`} />
                          <Label htmlFor={`edit-approval-user-${category.id}`}>User</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="forced" id={`edit-approval-forced-${category.id}`} />
                          <Label htmlFor={`edit-approval-forced-${category.id}`}>Forced</Label>
                        </div>
                      </RadioGroup>
                    ) : (
                      category.approvalType === 'user' ? 'User Choice' : 'Forced by System'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      editingCategory.approvalType === 'forced' ? (
                        <Select
                          value={editingCategory.approvalGroup || ''}
                          onValueChange={(value) => setEditingCategory({ ...editingCategory, approvalGroup: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select group" />
                          </SelectTrigger>
                          <SelectContent>
                            {approvalGroups.map((group) => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        'N/A'
                      )
                    ) : (
                      category.approvalGroup || 'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory && editingCategory.id === category.id ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSaveEdit}><Check className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}><X className="h-4 w-4" /></Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Category</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete the category "{category.name}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}