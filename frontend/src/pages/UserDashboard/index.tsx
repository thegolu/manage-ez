import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { dashboardData, suggestedForYou } from "./constants";
import { urls } from "../../enum/api";
import { GlobalContext } from "../../context";
import { useService } from "../../service/useService";
import BackDrop from "../../components/BackDrop";

const UserDashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { get, post } = useService();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { employee, teamMembers, currentPunchData, absentData } = state as any;

  const fetchEmployee = async () => {
    try {
      const { response } = await get(urls.employee);
      dispatch({ employee: response?.data });
    } catch (err) {
      dispatch({ error: err });
    }
  };

  const fetchDashboardData = async () => {
    try {
      const promises = [];
      if (!teamMembers) {
        promises.push(
          get(urls.teamMembers).then(({ response }: any) => {
            dispatch({
              teamMembers: response?.data,
            });
          })
        );
      }
      if (!currentPunchData) {
        promises.push(
          post(urls.getAttendance, {
            startDate: new Date(),
            endDate: new Date(),
          }).then(({ response }: any) => {
            dispatch({
              currentPunchData: response?.data?.[0],
            });
          })
        );
      }
      if (!absentData) {
        promises.push(
          get(urls.getAbsentDays).then(({ response }: any) => {
            dispatch({
              absentData: response?.data?.length,
            });
          })
        );
      }
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!employee) {
      fetchEmployee();
    }
    fetchDashboardData();
  }, []);

  const handlePunch = async () => {
    try {
      setIsLoading(true);
      const { response } = await post(urls.punch, {});
      dispatch({ currentPunchData: response?.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!employee) {
    return <BackDrop isOpen={true} />;
  }

  return (
    <div>
      <h4 className="text-[16px] font-semibold mb-2">Dashboard</h4>
      <div className="flex w-full gap-3 flex-wrap">
        {dashboardData.map((data, index) => {
          return (
            <div
              key={index}
              className="p-4 bg-white border border-[#E3E3E3] rounded-xl mb-2 flex-1 flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold">{data.value}</h2>
                <h6 className="text-sm mt-2 text-[#8C8C8C]">{data.title}</h6>
              </div>
              <div
                className="rounded-full  p-3"
                style={{ backgroundColor: data.bgColor }}
              >
                <data.icon
                  sx={{ width: "24px", height: "24px", fill: data.iconColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h4 className="text-[16px] font-semibold mb-2">Attendance</h4>
        <div className="p-4 bg-white border border-[#E3E3E3] rounded-xl  mb-2 flex-1 flex items-center justify-between">
          <div className="w-full">
            <h6 className="text-sm text-[#8C8C8C]">Today's Shift</h6>
            <div className="flex justify-between items-center">
              <div className="flex items-center w-1/2 justify-between gap-14">
                <div>
                  <h6 className="text-[16px] mt-3">Punch In</h6>
                  <h6 className="text-[16px] mt-1 font-semibold">
                    {currentPunchData?.checkIn
                      ? new Date(currentPunchData.checkIn).toLocaleTimeString()
                      : "---.---"}
                  </h6>
                </div>
                <div>
                  <h6 className="text-[16px] mt-3">Punch In</h6>
                  <h6 className="text-[16px] mt-1 font-semibold">
                    {currentPunchData?.checkOut
                      ? new Date(currentPunchData.checkOut).toLocaleTimeString()
                      : "---.---"}
                  </h6>
                </div>
              </div>
              <Button
                variant="contained"
                disabled={
                  isLoading ||
                  (currentPunchData?.checkIn && currentPunchData?.checkOut)
                }
                className="mt-4"
                onClick={() => handlePunch()}
              >
                <BackDrop isOpen={isLoading} />
                Punch
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex">
        <div className="p-4 border border-[#E3E3E3] rounded-xl">
          <h4 className="text-[14px] font-semibold mb-2">Suggested for you</h4>
          <div className="flex gap-3 flex-wrap">
            {suggestedForYou.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-md py-2 px-3 flex gap-2 items-center cursor-pointer`}
                  style={{ backgroundColor: item.bgColor }}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon
                    sx={{ width: "16px", height: "16px", fill: item.iconColor }}
                  />
                  <h3 className="text-xs ">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
