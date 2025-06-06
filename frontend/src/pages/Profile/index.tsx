import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eRoutes } from "../../enum/eRoutes";
import { urls } from "../../enum/api";
import { useService } from "../../service/useService";

const Profile = () => {
  const { get } = useService();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { response } = await get(urls.employee);
        setEmployee(response?.data);
      } catch (err: any) {
        console.log(err);
        if (err?.status === 401) {
          navigate(eRoutes.LOGIN);
          return;
        }
      }
    })();
  }, []);

  return (
    <div>
      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-[16px] font-bold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.user.name}
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.user.email}
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.gender}
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marital Status
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.maritalStatus}
              </h3>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-[16px] font-bold mb-4">Work Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.department.name}
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <h3 className="w-full pl-2 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                {employee?.employeeId}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
