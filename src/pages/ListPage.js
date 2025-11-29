import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListPage() {
    const [students, setStudents] = useState([]);
    
   
    const API_URL = "https://6915289384e8bd126af8d850.mockapi.io/student"; 

    // 데이터 가져오기 (GET)
    const getStudents = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(err => console.error("데이터 로드 실패:", err));
    };

    // 데이터 삭제 기능 (DELETE)
    const deleteStudent = (id) => {
        if(window.confirm("정말 이 학생 데이터를 삭제하시겠습니까?")) {
            fetch(`${API_URL}/${id}`, { method: "DELETE" })
                .then((res) => {
                    if (res.ok) {
                        alert("삭제되었습니다.");
                        getStudents(); // 목록 새로고침
                    } else {
                        alert("삭제 실패!");
                    }
                });
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <h2>학생 목록 ({students.length}명)</h2>
            <Link to="/create" className="btn btn-primary mb-3">학생 추가하기 (Create)</Link>
            
            <ul className="list-group">
                {students.map((student) => (
                    <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{student.name}</strong> ({student.age}세) / 학번: {student.student_id} / 성적: {student.student_grade}
                        </span>
                        <div>
                            
                        <Link to={`/detail/${student.id}`} className="btn btn-info btn-sm me-2">
                            상세(Detail)
                        </Link>
                        
                        <Link to={`/update/${student.id}`} className="btn btn-warning btn-sm me-2">
                            수정(Update)
                        </Link>
                        
                        <button onClick={() => deleteStudent(student.id)} className="btn btn-danger btn-sm">
                            삭제
                        </button>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPage;