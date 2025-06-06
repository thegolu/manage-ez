interface TableProps {
  leaveRequest: any;
}

const Table: React.FC<TableProps> = ({ leaveRequest }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-600";
      case "reject":
        return "bg-red-50 text-red-600";
      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  return (
    <div className="bg-white rounded-lg mt-2 hover:bg-gray-50/50 transition-all border-b border-gray-100 group">
      <div className="flex items-center h-14 px-6">
        {/* Status Indicator */}
        <div className="flex-shrink-0 w-5">
          <div
            className={`w-2 h-2 rounded-full ${
              leaveRequest.status === "approved"
                ? "bg-green-500"
                : leaveRequest.status === "reject"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          ></div>
        </div>

        {/* Leave Type */}
        <div className="flex-shrink-0 w-32">
          <span className="text-sm font-medium text-gray-900">
            {leaveRequest.leaveType.charAt(0).toUpperCase() +
              leaveRequest.leaveType.slice(1) +
              " Leave"}
          </span>
        </div>

        {/* Date Range */}
        <div className="flex-shrink-0">
          <span className="text-sm text-gray-600">
            {new Date(leaveRequest.startDate).toLocaleDateString()} -{" "}
            {new Date(leaveRequest.endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Reason */}
        <div className="flex-grow">
          <span className="text-sm text-gray-600">{leaveRequest.reason}</span>
        </div>

        {/* Status and Actions */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(
              leaveRequest.status
            )}`}
          >
            {leaveRequest.status.charAt(0).toUpperCase() +
              leaveRequest.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Table;
