import React, { useState } from 'react';

const EditStudent = ({ student, editStudent }) => {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [subjects, setSubjects] = useState(student.subjects.join(', '));
  const [marks, setMarks] = useState(student.marks.join(', '));

  const handleSave = () => {
    const subjectsArray = subjects.split(',').map((sub) => sub.trim());
    const marksArray = marks.split(',').map((mark) => parseInt(mark.trim()));

    editStudent(student.id, {
      ...student,
      name,
      age: parseInt(age),
      subjects: subjectsArray,
      marks: marksArray,
    });
  };

  return (
    <div>
      <button onClick={handleSave}>Edit</button>
    </div>
  );
};

export default EditStudent;
