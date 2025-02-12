import React, { useState } from 'react';

const AddStudent = ({ addStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [subjects, setSubjects] = useState('');
  const [marks, setMarks] = useState('');

  const handleAdd = () => {
    if (!name || !age || !subjects || !marks) {
      return alert('Please fill out all fields');
    }

    const subjectsArray = subjects.split(',').map((sub) => sub.trim());
    const marksArray = marks.split(',').map((mark) => parseInt(mark.trim()));

    addStudent({
      id: Date.now(),
      name,
      age: parseInt(age),
      subjects: subjectsArray,
      marks: marksArray,
    });

    setName('');
    setAge('');
    setSubjects('');
    setMarks('');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter student age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter subjects (comma separated)"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter marks (comma separated)"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />
      <button onClick={handleAdd}>Add Student</button>
    </div>
  );
};

export default AddStudent;
