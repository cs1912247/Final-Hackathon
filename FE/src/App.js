import { useEffect, useState } from "react";
import "./App.css";
import Datasheet from "./Components/Datasheet";
import StudentData from "./Components/StudentData";

const App = () => {
  const [data, setData] = useState([]);
  const [grades, setGrades] = useState([]);
  const [heads, setHeads] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [gradeValidation, setGradeValidation] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:4000/");
      const res = await data.json();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setHeads(res.heads);
      setGrades(res.grades);
      setData(res.students);
    })();
  }, []);

  const calculateGrade = (total) =>
    grades.find(({ start, end }) => total >= start && total <= end)?.grade;

  const handleSelectedStudent = (index) => {
    setSelectedStudent({ index, student: data[index] });
  };

  const handleGradeChange = (scoreIndex, gradeValue) => {
    const parsedGradeValue = parseFloat(gradeValue);

    if (
      !(parsedGradeValue >= 0 && parsedGradeValue <= heads[scoreIndex].total)
    ) {
      setGradeValidation(
        `${heads[scoreIndex].headname} marks shoud be in range 0 to ${heads[scoreIndex].total}`
      );
      return;
    }

    const temp = { ...selectedStudent.student };
    temp.scores[scoreIndex].marks = parseFloat(gradeValue);
    setSelectedStudent({ ...selectedStudent, student: temp });

    const temp2 = [...data];
    const temp3 = data[selectedStudent.index];
    temp3.gradeChange = true;
    temp3.scores[scoreIndex].marksChange = true;
    temp2[selectedStudent.index] = temp3;
    setData(temp2);
  };

  return (
    <div className="container">
      <div className="div-1">
        <Datasheet
          handleSelectedStudent={handleSelectedStudent}
          calculateGrade={calculateGrade}
          data={data}
          heads={heads}
        />
      </div>
      <div className="div-2">
        {selectedStudent.student && (
          <StudentData
            heads={heads}
            student={selectedStudent.student}
            handleGradeChange={handleGradeChange}
            calculateGrade={calculateGrade}
            gradeValidation={gradeValidation}
          />
        )}
      </div>
    </div>
  );
};

export default App;
