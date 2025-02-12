// import React from 'react';

// function GradeTable({ students, onEditGrade, onDeleteStudent }) {
//   return (
//     <div>
//       <h2>Student List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Grade</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, index) => (
//             <tr key={index}>
//               <td>{student.name}</td>
//               <td>
//                 <input
//                   type="number"
//                   value={student.grade}
//                   onChange={(e) => onEditGrade(index, e.target.value)}
//                 />
//               </td>
//               <td>
//                 <button onClick={() => onDeleteStudent(index)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default GradeTable;
