import React, {useState} from "react";
import "./Form.css";



function Form({onSave}){

    const [inputs, setInputs] = useState({
        student_name: "",
        student_age:"",
        student_id: "",
        student_grade: "A"

    });

    const {student_name, student_age, student_id, student_grade} = inputs;

    const handle_change = (e) => {
        // 구조분해할당
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지
        onSave(inputs); // 부모(ShowList)에게 데이터 토스!
        setInputs({ student_name: "", student_age: "", student_id: ""
            , student_grade: ""
        }); // 입력창 비우기
  };



    return(
        <>
        <form onSubmit={handleSubmit}>
            <h4>학생 관리 (조회/수정/삭제)</h4>
            <p>MockAPI의 고유 'id' (숫자 1, 2, 3...)를 입력하세요.</p>
            name: <input type="text" name="student_name" value={student_name} onChange={handle_change} placeholder="student_name"/><br/>
            age: <input type="number" name ="student_age" value={student_age} onChange={handle_change} placeholder="student_age"/><br/>
            student number: <input type="text" name="student_id" value={student_id} onChange={handle_change} placeholder="student_id"/><br/>
            grade:
            <select name="student_grade" onChange={handle_change} value={student_grade}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
            </select><br/>

            <button type="button" id="update_btn" className="btn btn-warning mt-2">학생데이터 수정</button>
            <button type="button" id="delete_btn" className="btn btn-danger mt-2">학생데이터 삭제</button>
            <button type="button" id="detail_btn" className="btn btn-info mt-2">학생데이터 가져오기</button>
        </form>
        

        </>
    );
}

export default Form;


