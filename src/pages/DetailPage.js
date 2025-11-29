import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const API_URL = `https://6915289384e8bd126af8d850.mockapi.io/student/${id}`;

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setStudent(data))
            .catch(err => console.error("데이터 로드 실패:", err));
    }, [API_URL]);

    if (!student) return <div className="container mt-3">로딩 중...</div>;

    return (
        <div className="container mt-3">
            <h2>학생 상세 정보</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">학번: {student.student_id}</h6>
                    <p className="card-text">
                        <strong>나이:</strong> {student.age}세<br/>
                        <strong>학점:</strong> {student.student_grade}<br/>
                        <strong>ID:</strong> {student.id}
                    </p>
                    <button onClick={() => navigate("/list")} className="btn btn-secondary">
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;