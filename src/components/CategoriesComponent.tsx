import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for categories
const initialCategories = [
  { id: 1, name: 'Health', approvals: 2, cfoApproval: true, preRequestNeeded: false, approvalType: 'forced', approvalGroup: 'medical' },
  { id: 2, name: 'Auto', approvals: 1, cfoApproval: false, preRequestNeeded: true, approvalType: 'user', approvalGroup: null },
  { id: 3, name: 'Travel', approvals: 1, cfoApproval: false, preRequestNeeded: false, approvalType: 'user', approvalGroup: null },
  { id: 4, name: 'Property', approvals: 3, cfoApproval: true, preRequestNeeded: true, approvalType: 'forced', approvalGroup: 'realestate' },
]

// Mock data for approval groups
const approvalGroups = ['general', 'medical', 'realestate', 'it', 'hr']

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
      <h1 className="text-3xl font-bold mb-6">Claim Categories</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>Create a new claim category with custom approval settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <Label htmlFor="new-category-name">Category Name</Label>
              <Input
                id="new-category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label htmlFor="new-category-approvals">Number of Approvals</Label>
              <Select
                value={newCategory.approvals.toString()}
                onValueChange={(value) => setNewCategory({ ...newCategory, approvals: parseInt(value) })}
              >
                <SelectTrigger id="new-category-approvals" className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="new-category-cfo"
                checked={newCategory.cfoApproval}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, cfoApproval: checked })}
              />
              <Label htmlFor="new-category-cfo">CFO Approval Needed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="new-category-prerequest"
                checked={newCategory.preRequestNeeded}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, preRequestNeeded: checked })}
              />
              <Label htmlFor="new-category-prerequest">Pre-Request Needed</Label>
            </div>
            <div className="flex-1 w-full">
              <Label className="mb-2 block">Approval Type</Label>
              <RadioGroup
                value={newCategory.approvalType}
                onValueChange={(value) => setNewCategory({ ...newCategory, approvalType: value, approvalGroup: value === 'user' ? null : newCategory.approvalGroup })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="new-approval-user" />
                  <Label htmlFor="new-approval-user">User Choice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="forced" id="new-approval-forced" />
                  <Label htmlFor="new-approval-forced">Forced by System</Label>
                </div>
              </RadioGroup>
            </div>
            {newCategory.approvalType === 'forced' && (
              <div className="flex-1">
                <Label htmlFor="new-category-group">Approval Group</Label>
                <Select
                  value={newCategory.approvalGroup || ''}
                  onValueChange={(value) => setNewCategory({ ...newCategory, approvalGroup: value })}
                >
                  <SelectTrigger id="new-category-group">
                    <SelectValue placeholder="Select approval group" />
                  </SelectTrigger>
                  <SelectContent>
                    {approvalGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button onClick={handleAddCategory} disabled={!newCategory.name || (newCategory.approvalType === 'forced' && !newCategory.approvalGroup)}>Add Category</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
          <CardDescription>Manage and edit existing claim categories</CardDescription>
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
                <TableRow key={category.id}>
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