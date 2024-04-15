import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom"
import { HiMiniBars3, HiArrowRight } from "react-icons/hi2"
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
function Courses({ courses }: { courses: any[]; }) {
    const style = {color: "red", fontSize: "25px", paddingTop: "10px"};
    const locationStyle = {color: "black"};
    const moduleStyle:React.CSSProperties = { position: "fixed", overflowY: "scroll", top: "100px", left: "320px", bottom: "0px", right: "0px" };
    const { courseId } = useParams();
    const { pathname } = useLocation();
    const location = pathname.split('/').pop();
    // const course = courses.find((course) => course._id === courseId);
    const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}`
      );
      setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);      
    return (
        <div className = "container-fluid">
            <h1 className="d-none d-sm-block" style={style}>&nbsp;&nbsp;&nbsp;<HiMiniBars3 />&nbsp;&nbsp;&nbsp;{course?.name}&nbsp;&nbsp;&nbsp;<HiArrowRight />&nbsp;&nbsp;&nbsp;<span style={locationStyle}>{location}</span></h1><hr/>
            <CourseNavigation />
                <div style={moduleStyle} >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                        <Route path="Quizzes" element={<Quizzes/>} />
                        <Route path="People" element={<h1>People</h1>} />
                    </Routes>
                </div>
        </div>
    );
}

export default Courses;