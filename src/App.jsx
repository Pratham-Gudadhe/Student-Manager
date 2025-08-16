import React, { useState } from "react";
import Form from "./components/Form.jsx";
import StudentTable from "./components/StudentTable.jsx";
import SearchAndSort from "./components/SearchAndSort.jsx"; 
import "./App.css";
import TestRunner from "./components/TestRunner.jsx";

export default function StudentManagerApp() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ dept: "", year: "" });
  const [testMessage, setTestMessage] = useState(""); 

  const handleSave = (student) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.roll === editingStudent.roll ? student : s))
      );
    } else {
      setStudents((prev) => [...prev, student]);
    }
    setEditingStudent(null);
  };

  const handleClear = () => {
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = (roll) => {
    setStudents((prev) => prev.filter((s) => s.roll !== roll));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSort = (field, direction) => {
    setStudents((prev) =>
      [...prev].sort((a, b) => {
        if (field === "name") {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (field === "cgpa") {
          return direction === "asc" ? a.cgpa - b.cgpa : b.cgpa - a.cgpa;
        }
        return 0;
      })
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({ dept: "", year: "" });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = filters.dept ? student.dept === filters.dept : true;
    const matchesYear = filters.year ? student.year === filters.year : true;

    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="app-wrapper">
      <h1 className="main-heading">Student Data Manager</h1>

      <div className="app-container">
        <div className="panel">
          <div className="panel-content">
            <Form
              editingStudent={editingStudent}
              onSave={handleSave}
              onClear={handleClear}
              students={students}
            />
            <TestRunner setMessage={setTestMessage} />
            {testMessage && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {testMessage}
              </p>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-content scrollable">
            <SearchAndSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFilterChange={handleFilterChange}
              onSort={handleSort}
              onClearFilters={handleClearFilters}
            />

            <StudentTable
              students={filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
