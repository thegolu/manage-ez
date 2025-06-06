import { urls } from "../../../../enum/api";
import { useService } from "../../../../service/useService";

const LeaveRequestCard = ({ data }: any) => {
  const { employee, leaveRequests } = data;
  const { post } = useService();

  const handleApprove = async (leaveId: string) => {
    try {
      const response = await post(urls.leaveAction, {
        leaveId,
        action: "approve",
      });
      console.log(response);
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async (leaveId: string) => {
    try {
      const response = await post(urls.leaveAction, {
        leaveId,
        action: "reject",
      });
      console.log("Rejecting leave request:", response);
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Employee Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {employee.user.profilePicture ? (
              <img
                src={employee.user.profilePicture}
                alt={employee.user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-blue-600 font-medium">
                {employee.user.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-gray-900 font-medium">{employee.user.name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{employee.employeeId}</span>
              <span>•</span>
              <span>{employee.department.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="divide-y divide-gray-100">
        {leaveRequests.map((request: any) => (
          <div key={request._id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {request.leaveType.charAt(0).toUpperCase() +
                    request.leaveType.slice(1)}{" "}
                  Leave
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    request.status === "pending"
                      ? "bg-yellow-50 text-yellow-600"
                      : request.status === "approved"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Applied on {new Date(request.appliedOn).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              <div>
                {new Date(request.startDate).toLocaleDateString()} -{" "}
                {new Date(request.endDate).toLocaleDateString()}
              </div>
              <div className="mt-1">{request.reason}</div>
            </div>

            {request.status === "pending" && (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleApprove(request._id)}
                  disabled
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 tran tion-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="px-4 py-1.5 text-sm font-medium border border-gray-200 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequestCard;
