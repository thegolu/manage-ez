import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eRoutes } from "../../enum/eRoutes";
import { Button } from "@mui/material";
import { urls } from "../../enum/api";
import { GlobalContext } from "../../context";
import { useService } from "../../service/useService";
import BackDrop from "../../components/BackDrop";

const ApplyLeave = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { get, post } = useService();
  const navigate = useNavigate();

  const { leaveBalance } = state as any;

  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchLeaveBalance = async () => {
    try {
      const { response } = await get(urls.leaveBalance);
      dispatch({ leaveBalance: response?.response });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!leaveBalance) {
      fetchLeaveBalance();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(leaveData);
    if (!leaveData.leaveType || !leaveData.startDate || !leaveData.endDate) {
      return;
    }
    try {
      const { response } = await post(urls.applyLeave, {
        leaveType: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.reason,
      });
      console.log(response);
      navigate(eRoutes.LEAVE);
    } catch (err) {
      console.log(err);
    }
  };

  if (!leaveBalance) {
    return <BackDrop isOpen={true} />;
  }

  return (
    <div>
      {/* Leave Application Form */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leave Details */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-[16px] font-bold mb-4">Leave Details</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type
              </label>
              <select
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={leaveData.leaveType}
                onChange={(e) =>
                  setLeaveData({ ...leaveData, leaveType: e.target.value })
                }
              >
                <option value="">Select Leave Type</option>
                {Object.keys(leaveBalance.leaves).map((leaveType) => {
                  return (
                    <option key={leaveType} value={leaveType}>
                      {leaveType.charAt(0).toUpperCase() +
                        leaveType.slice(1) +
                        " Leave" +
                        ` (Balance: ${leaveBalance.leaves[leaveType].balance})`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={leaveData.startDate}
                onChange={(e) =>
                  setLeaveData({ ...leaveData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={leaveData.endDate}
                onChange={(e) =>
                  setLeaveData({ ...leaveData, endDate: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-[16px] font-bold mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Leave
              </label>
              <textarea
                className="w-full pl-2 pr-4 py-2 border-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Please provide details about your leave request..."
                value={leaveData.reason}
                onChange={(e) =>
                  setLeaveData({ ...leaveData, reason: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button variant="contained" onClick={handleSubmit}>
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default ApplyLeave;
