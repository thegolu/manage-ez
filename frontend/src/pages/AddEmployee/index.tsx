import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useService } from "../../service/useService";
import { GlobalContext } from "../../context";
import { eRoutes } from "../../enum/eRoutes";
import BackDrop from "../../components/BackDrop";

interface EmployeeFormData {
  employeeId: string;
  email: string;
  name: string;
  dob: string;
  password: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  departmentCode: string;
  phone: string;
  // profilePicture?: string;
  managerId?: string;
}

const AddEmployee = () => {
  const { get, post } = useService();
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeId: "",
    email: "",
    name: "",
    dob: "",
    password: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    departmentCode: "",
    phone: "",
    // profilePicture: "",
    managerId: "",
  });

  const { departments } = state as any;

  const fetchDepartments = async () => {
    try {
      const { response } = await get("/department/all");
      dispatch({ departments: response?.data });
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    if (!departments) {
      fetchDepartments();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.employeeId || !formData.email || !formData.name || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const submitData = { ...formData };
      
      // Remove empty optional fields
      // if (!submitData.profilePicture) delete submitData.profilePicture;
      if (!submitData.managerId) delete submitData.managerId;

      await post("/employee/add", submitData);
      alert("Employee added successfully!");
      navigate(eRoutes.TEAM);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!departments) {
    return <BackDrop isOpen={true} />;
  }

  return (
    <div>
      <BackDrop isOpen={isLoading} />
      
      <div className="mb-6">
        <h4 className="text-[16px] font-semibold mb-2">Add New Employee</h4>
        <p className="text-sm text-[#8C8C8C]">Fill in the employee details to add them to the system</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-[16px] font-bold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID *
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter employee ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status *
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter profile picture URL (optional)"
                />
              </div> */}
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-[16px] font-bold mb-4">Work Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  name="departmentCode"
                  value={formData.departmentCode}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  required
                >
                  <option value="">Select Department</option>
                  {departments?.map((dept: any) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter designation"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manager Employee ID
                </label>
                <input
                  type="text"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter manager's employee ID (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
          >
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;