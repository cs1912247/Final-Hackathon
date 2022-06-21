import { useEffect, useState } from "react";

const StudentData = ({
  student,
  heads,
  handleGradeChange,
  calculateGrade,
  gradeValidation,
}) => {
  const { name, regno, scores } = student;
  let totalMarks = 0;
  const [marks, setMarks] = useState([0]);

  useEffect(() => {
    setMarks(scores.map(({ marks }) => marks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table className="student-info">
        <tbody>
          <tr>
            <td className="col-name">Reg #:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td className="col-name">Name:</td>
            <td>{regno}</td>
          </tr>
        </tbody>
      </table>
      {gradeValidation && <p className="grade-validation">{gradeValidation}</p>}

      <table className="student-grades">
        <thead>
          <tr className="col-name">
            <td>#</td>
            <td>Heads</td>
            <td>Total</td>
            <td>Marks</td>
          </tr>
        </thead>
        <tbody>
          {heads.map(({ headname, total }, index) => {
            totalMarks += scores[index].marks;
            return (
              <tr key={headname}>
                <td>{index + 1}</td>
                <td className="col-name">{headname}</td>
                <td>{total}</td>
                <td>
                  <input
                    type="text"
                    value={marks[index]}
                    onChange={(e) => {
                      const temp = [...marks];
                      temp[index] = e.target.value;
                      setMarks(temp);
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !isNaN(parseFloat(e.target.value)) &&
                      isFinite(e.target.value) &&
                      handleGradeChange(index, e.target.value)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="student-total-grades">
        <tbody>
          <tr>
            <td className="col-name">Total</td>
            <td>{totalMarks}</td>
          </tr>
          <tr>
            <td className="col-name">100%</td>
            <td>{Math.round(totalMarks).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="col-name">Grade</td>
            <td>{calculateGrade(Math.round(totalMarks))}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StudentData;
