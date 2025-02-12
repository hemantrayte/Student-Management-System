import React from 'react';
import EditStudent from './EditStudent';

const StudentList = ({ students, editStudent, deleteStudent }) => {
  // Calculate the average for each subject
  const calculateSubjectAverage = (marks) => {
    const total = marks.reduce((acc, mark) => acc + mark, 0);
    return (total / marks.length).toFixed(2);
  };

  // Calculate the total average for all subjects
  const calculateTotalAverage = (students) => {
    const totalMarks = students.reduce(
      (acc, student) => acc + student.marks.reduce((a, b) => a + b, 0),
      0
    );
    const totalSubjects = students.reduce(
      (acc, student) => acc + student.marks.length,
      0
    );
    return (totalMarks / totalSubjects).toFixed(2);
  };

  return (
    <div>
      <h2>Student List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Subjects</th>
            <th>Average Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.subjects.join(', ')}</td>
              <td>{calculateSubjectAverage(student.marks)}</td>
              <td>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                <EditStudent student={student} editStudent={editStudent} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Total Average Marks: {calculateTotalAverage(students)}</h3>
      </div>
    </div>
  );
};

export default StudentList;
