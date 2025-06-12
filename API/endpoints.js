import api from "./axiosInstance";

// Courses
export const addCourse = async (newCourseData) => await api.post('/Courses', newCourseData);
export const getCourses = async ({ page = 0, level = 1, semester = 1, name = "" }) => await api.get(`/Courses?page=${page}&level=${level}&semester=${semester}&name=${name}`);
export const updateCourse = async (courseId, updatedData) => await api.put(`/Courses/${courseId}`, updatedData)
export const deleteCourse = async (id) => await api.delete('/Courses', { data: [id] });

// Students
export const getStudents = async ({ page = 0, level = 1, gender = "", name = "" }) => await api.get(`/Users?page=${page}&role=2&level=${level}&gender=${gender}&name=${name}`);
export const updateStudent = async (username, updatedData) => await api.put(`/Users/${username}`, updatedData);
export const deleteStudent = async (usernamesList) => await api.delete(`/Users?role=2`, { data: usernamesList }); // string arr of usernames
export const addStudent = async (newStudentData) => await api.post('/Users/', newStudentData);// role is 2 for student


// Teaching Staff
export const addTeachingStaff = async (newTeachingStaffData) => await api.post('/Users/', newTeachingStaffData);// role is 1 for teaching staff
export const getTeachingStaff = async ({ page = 0, level = 6, gender = "", name = "" }) => await api.get(`/Users?page=${page}&role=1&level=${level}&gender=${gender}&name=${name}`);
export const updateTeachingStaff = async (username, updatedData) => await api.put(`/Users/${username}`, updatedData)
export const deleteTeachingStaff = async (usernamesList) => await api.delete(`/Users?role=1`, { data: usernamesList }); // string arr of usernames


// Teaching Places
export const addTeachingPlace = async (newPlaceData) => await api.post('/TeachingPlaces', newPlaceData);
export const getTeachingPlaces = async ({ page = 0, type = "", name = "" }) => await api.get(`/TeachingPlaces?page=${page}&type=${type}&name=${name}`);
export const updateTeachingPlace = async (placeId, updatedData) => await api.put(`/TeachingPlaces/${placeId}`, updatedData)
export const deleteTeachingPlace = async (id) => await api.delete('/TeachingPlaces', { data: [id] });

// Course Dependencies
export const getCourseDependencies = async (courseId) => await api.get(`/Courses/${courseId}/Dependencies`)
export const addCourseDependency = async (courseId, coursesId) => await api.post(`/Courses/${courseId}/Dependencies`, { coursesId })
export const deleteCourseDependency = async (courseId, coursesId) => await api.delete(`/Courses/${courseId}/Dependencies`, { data: { coursesId } })


// Schedules

export const getTeachingPlaceSchedules = async (placeId) => await api.get(`/TeachingPlaces/${placeId}/Schedules`)
export const addTeachingPlaceSchedules = async (placeId, schedules) => await api.post(`/TeachingPlaces/${placeId}/Schedules`, schedules)

export const getTeachingStaffSchedules = async (username) => await api.get(`/Users/${username}/Schedules`)
export const addTeachingStaffSchedules = async (username, schedules) => await api.post(`/Users/${username}/Schedules`, schedules)

export const updateSchedule = async (scheduleId, scheduleData) => await api.put(`/Shedules/${scheduleId}`, scheduleData);
export const deleteSchedules = async (scheduleIdsList) => await api.delete('/Shedules', { data: scheduleIdsList });

// Statistics
export const getStatistics = async () => await api.get('/Statistics');

// staff and student schedules
// export const getStaffAndStudentSchedules = async (level) => await api.get(`/TimeTables?level=${level}`);

// profile
export const getProfile = async (username) => await api.get(`/Users/${username}`);

// my schedule
export const getMySchedule = async (username) => await api.get(`/TimeTables/${username}`);
