import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import StudentPost from "./StudentPost";

function ShowList() {
    // 빈 배열
    const [students, setStudents] = useState([]);

    const getStudents = () => {
        fetch("https://6915289384e8bd126af8d850.mockapi.io/student")
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
    }

   

    //가져오기 클릭 했을 때 
    //const get

    return(
        <div className="container mt-3">
            <h2>학생 관리 시스템</h2>
            // student form 넣기
            {/* 👇 자식 컴포넌트 배치하고, 통신 기능(POST) 연결하기 */}
            {/*<StudentPost /> */}
            {/* addStudent 함수는 아까 배운 fetch(POST) 로직으로 직접 만들어보세요! */}
            <StudentForm onSave={(data) => console.log("부모가 받은 데이터:", data)} />
            
            <button type="button"  id="update_btn" className="btn btn-warning mt-2">학생데이터 수정</button>
            <button type="button" id="delete_btn" className="btn btn-danger mt-2">학생데이터 삭제</button>
            <button type="button"  id="detail_btn" onClick={getStudents} className="btn btn-info mt-2">학생데이터 가져오기</button>
     
     <hr />

            

           <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} / {student.age}세
                        {/*<button type="button" id="update_btn" className="btn btn-warning mt-2">학생데이터 수정</button>
                        <button type="button" id="delete_btn" className="btn btn-danger mt-2">학생데이터 삭제</button>*/}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default ShowList;