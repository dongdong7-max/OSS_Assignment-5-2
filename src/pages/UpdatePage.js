import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePage() {
    const { id } = useParams(); // URL에서 수정할 학생 ID 가져오기
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        student_id: "",
        student_grade: "A"
    });
    
    // 과제 요구사항: 총 수정 횟수 카운트
    const [editCount, setEditCount] = useState(0);

    // 페이지 진입 시 이름 칸에 포커스 주기 위한 useRef
    const nameInputRef = useRef();

  
    const API_URL = `https://6915289384e8bd126af8d850.mockapi.io/student/${id}`;

    // 1. 기존 데이터 가져오기
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setInputs({
                    name: data.name,
                    age: data.age,
                    student_id: data.student_id,
                    student_grade: data.student_grade
                });
                // useRef 활용: 데이터 로딩 후 이름 입력창에 자동 포커스
                if(nameInputRef.current) {
                    nameInputRef.current.focus();
                }
            })
            .catch(err => console.error("데이터 로드 실패:", err));
    }, [API_URL]);

    // 2. 값 변경 시 즉시 수정 (PUT 요청)
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // 화면 상태 업데이트
        const newInputs = { ...inputs, [name]: value };
        setInputs(newInputs);

        // 수정 횟수 증가
        setEditCount(prev => prev + 1);

      
        if (value.trim() !== "") { // 빈 값이 아닐 때만 저장
            fetch(API_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newInputs)
            }).then(res => {
                if(res.ok) {
                    console.log(`자동 저장됨: ${name} -> ${value}`);
                }
            });
        }
    };

    return (
        <div>
            <h2>학생 정보 수정 (Update)</h2>


            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                    <label>이름:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={inputs.name} 
                        onChange={handleChange}
                        ref={nameInputRef} // Ref 연결
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>나이:</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={inputs.age} 
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>학번:</label>
                    <input 
                        type="text" 
                        name="student_id" 
                        value={inputs.student_id} 
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>학점:</label>
                    <select 
                        name="student_grade" 
                        value={inputs.student_grade} 
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
            </form>

            <button onClick={() => navigate("/list")} className="btn btn-secondary w-100">
                목록으로 돌아가기
            </button>
        </div>
    );
}

export default UpdatePage;