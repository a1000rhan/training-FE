import { makeAutoObservable } from "mobx";
import api from "./api";

class CourseStore {
  course = [];
  loading = true;
  constructor() {
    makeAutoObservable(this, {});
  }
  fetchCourse = async () => {
    try {
      const res = await api.get("/courses");
      this.course = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
<<<<<<< HEAD
  createCourse = async (course) => {
    try {
      const res = await api.post("/courses", course);
      this.course = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
=======
  deleteCourse = async (courseId, navigation) => {
    try {
      await api.delete(`/courses/${courseId}`);
      const tempCourse= this.course.filter((course) => course._id !== courseId);
      console.log(tempCourse)
      this.course =tempCourse
      navigation.navigate("CourseList");
    } catch (error) {
      console.log(
        "🚀 ~ file: courseStore.js ~ line 26 ~ courseStore ~ deleteCourse= ~ error",
        error
      );
>>>>>>> delet
    }
  };
}

const courseStore = new CourseStore();
courseStore.fetchCourse();
export default courseStore;
