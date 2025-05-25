import api from "./axiosInstance";

// Courses
export const addCourse = async (newCourseData) => await api.post('/Courses', newCourseData);
export const getCourses = async (page = 0, level = 1) => await api.get(`/Courses?page=${page}&sortByLevelAscending=true&level=${level}`)
export const updateCourse = async (courseId, updatedData) => await api.put(`/Courses/${courseId}`, updatedData)
export const deleteCourse = async (id) => await api.delete('/Courses', { data: [id] });



// Teaching Places
export const addTeachingPlace = async (newPlaceData) => await api.post('/TeachingPlaces', newPlaceData);
export const getTeachingPlaces = async () => await api.get('/TeachingPlaces?page=0&size=100')
export const updateTeachingPlace = async (placeId, updatedData) => await api.put(`/TeachingPlaces/${placeId}`, updatedData)
export const deleteTeachingPlace = async (id) => await api.delete('/TeachingPlaces', { data: [id] });
