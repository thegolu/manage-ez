import { useContext, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useService } from "../../service/useService";
import { GlobalContext } from "../../context";
import BackDrop from "../../components/BackDrop";

interface Department {
  code: string;
  name: string;
  description: string;
}

interface DepartmentFormData {
  code: string;
  name: string;
  description: string;
}

const Department = () => {
  const { get, post } = useService();
  const { state, dispatch } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [formData, setFormData] = useState<DepartmentFormData>({
    code: "",
    name: "",
    description: "",
  });

  const { departments } = state as any;

  const fetchDepartments = async () => {
    try {
      setIsLoading(true)
      const { response } = await get("/department/all");
      dispatch({ departments: response?.data });
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!departments) {
      fetchDepartments();
    }
  }, []);

  const handleOpenDialog = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        code: department.code,
        name: department.name,
        description: department.description,
      });
    } else {
      setEditingDepartment(null);
      setFormData({ code: "", name: "", description: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDepartment(null);
    setFormData({ code: "", name: "", description: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingDepartment) {
        await post(`/department/update`, formData);
      } else {
        await post("/department/add", formData);
      }
      fetchDepartments();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDelete = async (code: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await post(`/department/delete`, { code });
        fetchDepartments();
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  if (!departments || isLoading) {
    return <BackDrop isOpen={true} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[16px] font-semibold mb-2">Departments</h4>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((department: any) => (
          <div
            key={department.code}
            className="p-4 bg-white border border-[#E3E3E3] rounded-xl mb-2 flex-1"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[16px] font-semibold">{department.name}</h3>
                <h6 className="text-sm mt-2 text-[#8C8C8C]">
                  Code: {department.code}
                </h6>
              </div>
              <div className="flex space-x-2">
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(department)}
                  className="text-blue-600"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(department.code)}
                  className="text-red-600"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <h6 className="text-sm text-[#8C8C8C] mt-2">
              {department.description}
            </h6>
          </div>
        ))}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <h3 className="text-[16px] font-bold">
            {editingDepartment ? "Edit Department" : "Add New Department"}
          </h3>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            {!editingDepartment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter department code"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter department name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full pl-2 pr-4 py-2 border-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Enter department description"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingDepartment ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Department;
