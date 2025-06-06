import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";
import LeaveRequestCard from "./components/LeaveRequest";
import { eRoutes } from "../../enum/eRoutes";
import { urls } from "../../enum/api";
import { useService } from "../../service/useService";
import { GlobalContext } from "../../context";

const Leaves = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { get } = useService();
  const { leaveHistory, reporteeLeaveRequests } = state as any;

  const fetchLeaveData = async () => {
    try {
      const promises = [];
      if (!leaveHistory) {
        promises.push(
          get(urls.leaveHistory).then(({ response }: any) => {
            dispatch({ leaveHistory: response?.data });
          })
        );
      }
      if (!reporteeLeaveRequests) {
        promises.push(
          get(urls.leaveRequests).then(({ response }: any) => {
            dispatch({ reporteeLeaveRequests: response?.data });
          })
        );
      }
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <div>
      <div>
        <div
          className="bg-white p-6 rounded-xl shadow-sm mb-6 cursor-pointer border border-gray-100
      hover:shadow-lg transition-all duration-300 group"
          onClick={() => {
            navigate(eRoutes.APPLY_LEAVES);
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  New Leave Request
                </h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                  Quick Apply
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Take time off for vacation, sick leave, or personal matters
              </p>
            </div>
          </div>
        </div>
      </div>

      {reporteeLeaveRequests?.length > 0 && (
        <div>
          <h3 className="text-[16px] font-bold mb-2 mt-6">Leave Requests</h3>
          <div className="">
            {reporteeLeaveRequests.map((data: any, index: number) => (
              <LeaveRequestCard key={index} data={data} />
            ))}
          </div>
        </div>
      )}

      {leaveHistory?.length > 0 && (
        <div>
          <h3 className="text-[16px] font-bold mb-2 mt-6">Leave History</h3>
          <div className="">
            {leaveHistory.map((history: any, index: number) => (
              <Table key={index} leaveRequest={history} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
