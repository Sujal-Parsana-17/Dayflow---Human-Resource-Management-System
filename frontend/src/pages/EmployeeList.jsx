import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@components/common/DashboardLayout";
import { Card } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Circle,
  Plane,
} from "lucide-react";
import { StatusBadge } from "@components/common/StatusBadge";
import { format } from "date-fns";
import { api } from "@services/api";

function EmployeeList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      console.log('📊 Fetching employees from API...');
      const response = await api.get("/employees");
      console.log('📊 API Response:', response.data);
      
      // Backend returns { success, employees, total, pages, currentPage, message }
      const employeeData = response.data.employees || response.data.data || response.data;
      console.log('📊 Employee data:', employeeData);
      
      setEmployees(Array.isArray(employeeData) ? employeeData : []);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching employees:", err);
      setError(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.personalInfo?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.personalInfo?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.userId?.loginId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        alert("Error deleting employee: " + err.message);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <Circle className="h-4 w-4 text-green-500 fill-green-500" />;
      case "on-leave":
        return <Plane className="h-4 w-4 text-blue-500" />;
      case "absent":
        return <Circle className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400 fill-gray-400" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-1">
              Manage your organization's workforce
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/employees/add")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Users className="h-5 w-5 mr-2" />
            NEW
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error loading employees: {error}</p>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-odoo-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Employee Cards Grid */}
      {loading ? (
        <Card>
          <div className="px-6 py-12 text-center text-gray-500">
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-odoo-primary rounded-full mx-auto"></div>
            <p className="mt-4">Loading employees...</p>
          </div>
        </Card>
      ) : filteredEmployees.length === 0 ? (
        <Card>
          <div className="px-6 py-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No employees found</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => {
            const firstName = employee.personalInfo?.firstName || "U";
            const lastName = employee.personalInfo?.lastName || "";
            const fullName = `${firstName} ${lastName}`.trim();
            const email =
              employee.personalInfo?.email || employee.userId?.email || "";
            const designation = employee.jobDetails?.designation || "Employee";
            const loginId = employee.userId?.loginId || "";

            return (
              <Card
                key={employee._id}
                className="relative hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  navigate(`/employees/${employee._id}`, {
                    state: { viewOnly: true },
                  })
                }
              >
                {/* Status Indicator - Top Right */}
                <div className="absolute top-4 right-4">
                  {getStatusIcon("absent")}
                </div>

                {/* Employee Profile Picture */}
                <div className="flex flex-col items-center pt-6 pb-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-odoo-primary to-odoo-primary-light flex items-center justify-center text-white font-semibold text-2xl mb-3">
                    {firstName.charAt(0)}
                  </div>

                  {/* Employee Name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {fullName}
                  </h3>

                  {/* Employee Email */}
                  <p className="text-sm text-gray-500 mb-2">{email}</p>

                  {/* Designation */}
                  <p className="text-sm text-gray-600 mb-2">{designation}</p>

                  {/* Login ID */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-odoo-primary/10 text-odoo-primary uppercase mb-3">
                    {loginId}
                  </span>

                  {/* Action Buttons */}
                  <div
                    className="flex items-center space-x-2 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => navigate(`/employees/${employee._id}`)}
                      className="p-2 text-odoo-primary hover:bg-odoo-primary/10 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/employees/${employee._id}/edit`)
                      }
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Status Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Status Indicators:
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-green-500 fill-green-500" />
            <span>Employee is present in the office</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-blue-500" />
            <span>Employee is on leave</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>
              Employee is absent (has not applied time off and is absent)
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeList;
