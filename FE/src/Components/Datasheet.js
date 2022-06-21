import { Fragment } from "react";

const Datasheet = ({ calculateGrade, data, heads, handleSelectedStudent }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>S#</th>
          <th>Name</th>
          <th>Reg #</th>
          {heads.map(({ headname }) => (
            <th key={headname}>{headname}</th>
          ))}
          <th>Total</th>
          <th>100%</th>
          <th>Grade</th>
        </tr>
        {data.map(({ name, regno, scores, gradeChange }, index) => {
          let total = 0;

          return (
            <Fragment key={regno}>
              <tr>
                <td>{index + 1}</td>
                <td
                  className="student-name"
                  onClick={() => handleSelectedStudent(index)}
                >
                  {name}
                </td>
                <td>{regno}</td>
                {scores.map(({ _id, marks, marksChange }) => {
                  total += marks;
                  return (
                    <td
                      className={`${marksChange && "marks-change"}`}
                      key={_id}
                    >
                      {marks}
                    </td>
                  );
                })}
                <td className={`${gradeChange && "grade-change"}`}>{total}</td>
                <td className={`${gradeChange && "grade-change"}`}>
                  {Math.round(total).toFixed(2)}
                </td>
                <td className={`${gradeChange && "grade-change"}`}>
                  {calculateGrade(Math.round(total))}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Datasheet;
