// src/App.js

import React, { useState } from "react";
import "./App.css";

const StudentGradeManagement = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    age: "",
    marks: "",
  });
  const [isEditing, setIsEditing] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Add or Update student
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, subject, age, marks } = form;

    if (name && subject && age && marks) {
      const newStudent = { name, subject, age: parseInt(age), marks: parseFloat(marks) };
      
      if (isEditing === null) {
        setStudents([...students, newStudent]);
      } else {
        const updatedStudents = students.map((student, index) =>
          index === isEditing ? newStudent : student
        );
        setStudents(updatedStudents);
        setIsEditing(null);
      }
      setForm({ name: "", subject: "", age: "", marks: "" });
    }
  };

  // Delete a student
  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  // Edit student data
  const handleEdit = (index) => {
    setForm(students[index]);
    setIsEditing(index);
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalStudents = students.length;
    if (totalStudents === 0) return null;

    const totalMarks = students.reduce((acc, student) => acc + student.marks, 0);
    const highestMarks = Math.max(...students.map(student => student.marks));
    const lowestMarks = Math.min(...students.map(student => student.marks));

    const subjectAverages = students.reduce((acc, student) => {
      if (!acc[student.subject]) acc[student.subject] = { totalMarks: 0, count: 0 };
      acc[student.subject].totalMarks += student.marks;
      acc[student.subject].count += 1;
      return acc;
    }, {});

    for (let subject in subjectAverages) {
      subjectAverages[subject] = subjectAverages[subject].totalMarks / subjectAverages[subject].count;
    }

    return {
      totalStudents,
      totalMarks,
      highestMarks,
      lowestMarks,
      subjectAverages,
    };
  };

  const stats = getStatistics();

  return (
    <div className="container">
      <h1>Student Grade Management System</h1>

      <StudentForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <Statistics stats={stats} />

      <StudentList
        students={students}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

// Component for the student form (Add / Edit student)
const StudentForm = ({ form, handleChange, handleSubmit, isEditing }) => {
  return (
    <div className="form-container">
      <h2>{isEditing !== null ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          placeholder="Subject"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="marks"
          value={form.marks}
          placeholder="Marks"
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing !== null ? "Save Changes" : "Add Student"}</button>
      </form>
    </div>
  );
};

// Component to display statistics
const Statistics = ({ stats }) => {
  if (!stats) return null;

  const {
    totalStudents,
    totalMarks,
    highestMarks,
    lowestMarks,
    subjectAverages,
  } = stats;

  return (
    <div className="statistics-container">
      <h3>Statistics</h3>
      <p>Total Students: {totalStudents}</p>
      <p>Total Marks: {totalMarks}</p>
      <p>Highest Marks: {highestMarks}</p>
      <p>Lowest Marks: {lowestMarks}</p>
      <h4>Subject Averages:</h4>
      <ul>
        {Object.keys(subjectAverages).map((subject) => (
          <li key={subject}>
            {subject}: {subjectAverages[subject].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to display the list of students
const StudentList = ({ students, handleDelete, handleEdit }) => {
  return (
    <div className="student-list">
      <h3>Students</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Age</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.subject}</td>
              <td>{student.age}</td>
              <td>{student.marks}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGradeManagement;
