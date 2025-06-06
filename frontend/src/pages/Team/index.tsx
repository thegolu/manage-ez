import { useEffect, useState } from "react";
import { urls } from "../../enum/api";
import { useService } from "../../service/useService";

interface UserData {
  phone: string;
  email: string;
  name: string;
  profilePicture: string | null;
}

interface Department {
  code: string;
  name: string;
  description: string;
}

interface Employee {
  user: UserData;
  dob: string;
  employeeId: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: Department;
  isActive: boolean;
  createdAt: string;
  manager?: Employee | null;
}

interface HierarchyData {
  employee: Employee;
  reportees: Employee[];
}

const EmployeeCard = ({
  employee,
  isManager = false,
}: {
  employee: Employee;
  isManager?: boolean;
}) => {
  // Get initials from the name (up to 2 characters)
  const initials = employee.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`
      bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer
      ${isManager ? "border-2 border-blue-100" : "border border-gray-100"}
    `}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`
            w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium
            ${
              isManager
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }
          `}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {employee.user.name}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {employee.designation}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            {employee.department.name}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="truncate">{employee.user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HierarchyNode = ({
  data,
  onEmployeeClick,
}: {
  data: HierarchyData;
  onEmployeeClick: (employeeId?: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      {data.employee.manager && (
        <div className="w-1/2">
          <div
            className="flex flex-wrap justify-center gap-6 w-full max-w-4xl"
            onClick={() => onEmployeeClick(data.employee.manager?.employeeId)}
          >
            <EmployeeCard employee={data.employee.manager} />
          </div>
          <div className="w-px h-4 bg-gray-500 my-2 mx-auto" />
        </div>
      )}
      <div
        className="w-full sm:min-w-md border rounded-lg"
        onClick={() => onEmployeeClick(data.employee.employeeId)}
      >
        <EmployeeCard employee={data.employee} isManager={true} />
      </div>

      {data.reportees?.length > 0 && (
        <>
          <div className="w-px h-4 bg-gray-500 my-2 mx-auto" />
          <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-4xl">
            {data.reportees.map((reportee) => (
              <div
                key={reportee.employeeId}
                onClick={() => onEmployeeClick(reportee.employeeId)}
              >
                <EmployeeCard employee={reportee} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Team = () => {
  const { get } = useService();
  const [hierarchy, setHierarchy] = useState<HierarchyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { response } = await get(urls.hierarchy);
        setHierarchy(response.data);
      } catch (err) {
        setError("Failed to load team hierarchy");
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const onEmployeeClick = async (employeeId?: string) => {
    if (!employeeId) {
      return;
    }
    const { response } = await get(
      `${urls.hierarchy}?employeeId=${employeeId}`
    );
    setHierarchy(response.data);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Team Hierarchy</h3>
      </div>

      {hierarchy && (
        <HierarchyNode data={hierarchy} onEmployeeClick={onEmployeeClick} />
      )}
    </div>
  );
};

export default Team;
