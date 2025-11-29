import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
    const navigate = useNavigate();
    
    // 입력값 State
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        student_id: "",
        student_grade: "A"
    });

  
    const nameRef = useRef();
    const ageRef = useRef();

  
    const API_URL = "https://6915289384e8bd126af8d850.mockapi.io/student";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. 유효성 체크 (useRef 활용)
        if (inputs.name.trim().length === 0) {
            alert("이름을 입력해주세요!");
            nameRef.current.focus(); // 이름 칸으로 포커스 이동
            return;
        }
        if (inputs.age.trim() === "") {
            alert("나이를 입력해주세요!");
            ageRef.current.focus(); // 나이 칸으로 포커스 이동
            return;
        }

        // 2. 데이터 저장 (POST)
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        }).then((res) => {
            if (res.ok) {
                alert("학생 데이터가 추가되었습니다.");
                navigate("/list"); // 저장 후 목록 페이지로 이동
            }
        });
    };

    return (
        <div>
            <h2>학생 추가 (Create)</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>이름:</label>
                    <input 
                        name="name" 
                        value={inputs.name} 
                        onChange={handleChange} 
                        ref={nameRef} // ref 연결
                        className="form-control"
                        placeholder="이름 입력"
                    />
                </div>
                <div className="mb-2">
                    <label>나이:</label>
                    <input 
                        name="age" 
                        type="number" 
                        value={inputs.age} 
                        onChange={handleChange}
                        ref={ageRef} // ref 연결
                        className="form-control"
                        placeholder="나이 입력"
                    />
                </div>
                <div className="mb-2">
                    <label>학번:</label>
                    <input 
                        name="student_id" 
                        value={inputs.student_id} 
                        onChange={handleChange}
                        className="form-control"
                        placeholder="학번 입력"
                    />
                </div>
                <div className="mb-2">
                    <label>학점:</label>
                    <select name="student_grade" value={inputs.student_grade} onChange={handleChange} className="form-select">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success mt-2">저장하기</button>
            </form>
        </div>
    );
}

export default CreatePage;