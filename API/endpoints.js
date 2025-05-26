import api from "./axiosInstance";

// Courses
export const addCourse = async (newCourseData) => await api.post('/Courses', newCourseData);
export const getCourses = async (page = 0, level = 1) => await api.get(`/Courses?page=${page}&sortByLevelAscending=true&level=${level}`)
export const updateCourse = async (courseId, updatedData) => await api.put(`/Courses/${courseId}`, updatedData)
export const deleteCourse = async (id) => await api.delete('/Courses', { data: [id] });

// Students
export const getStudents = async (page = 0, level = 1) => await api.get(`/Users?page=${page}&role=2&level=${level}`)
export const updateStudent = async (username, updatedData) => await api.put(`/Users/${username}`, updatedData)
export const deleteStudent = async (usernamesList) => await api.delete(`/Users?role=2`, { data: usernamesList }); // string arr of usernames
export const addStudent = async (newStudentData) => await api.post('/Users/', newStudentData);// role is 2 for student



// Teaching Places
export const addTeachingPlace = async (newPlaceData) => await api.post('/TeachingPlaces', newPlaceData);
export const getTeachingPlaces = async () => await api.get('/TeachingPlaces?page=0&size=100')
export const updateTeachingPlace = async (placeId, updatedData) => await api.put(`/TeachingPlaces/${placeId}`, updatedData)
export const deleteTeachingPlace = async (id) => await api.delete('/TeachingPlaces', { data: [id] });
