import React, { useState, useEffect, useContext } from "react";
import { urls } from "../../enum/api";
import { GlobalContext } from "../../context";
import { useService } from "../../service/useService";

const Attendance: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { attendance } = state as any;
  const { post } = useService();

  const [loading, setLoading] = useState<boolean>(false);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const { response } = await post(urls.getAttendance, {});
      dispatch({ attendance: response?.data });
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!attendance) {
      fetchAttendanceRecords();
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-emerald-100 text-emerald-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 w-full bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!attendance?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">No attendance records found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Attendance Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Track your daily attendance and working hours
            </p>
          </div>

          {/* <div className="mt-4 sm:mt-0 flex space-x-4">
            <input
              type="month"
              // value={selectedMonth}
              // onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div> */}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Present Days", value: "22", color: "bg-emerald-500" },
            { label: "Absent Days", value: "3", color: "bg-red-500" },
            { label: "Late Days", value: "5", color: "bg-amber-500" },
            { label: "Total Hours", value: "176", color: "bg-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}
                >
                  <span className="text-white text-lg font-semibold">
                    {stat.value}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Attendance Records */}
        {/* <div className="bg-white rounded-xl shadow-lg"> */}
        <div>
          <div className="p-0">
            <div className="grid grid-cols-1 gap-4">
              {attendance?.map((record: any, index: number) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200 p-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Left Section - Date and Status */}
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900">
                            {new Date(record.date).getDate()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(record.date).toLocaleString("default", {
                              month: "short",
                            })}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <span
                          className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Right Section - Time Details */}
                    <div className="flex items-center gap-6 ml-16 sm:ml-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check In</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {record.checkIn
                              ? new Date(record.checkIn).toLocaleTimeString()
                              : "---.---"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check Out</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {record.checkOut
                              ? new Date(record.checkOut).toLocaleTimeString()
                              : "---.---"}
                          </p>
                        </div>
                      </div>

                      {record.totalHours && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Total Hours</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {record.totalHours.toFixed(2)}h
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {attendance?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium">
                    No attendance records found
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
