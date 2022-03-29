import { makeAutoObservable } from "mobx";
import api from "./api";

class CourseStore {
  courses = [];
  loading = true;
  constructor() {
    makeAutoObservable(this, {});
  }
  fetchCourse = async () => {
    try {
      const res = await api.get("/courses");
      this.courses = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
  deleteCourse = async (courseId, navigation) => {
    try {
      await api.delete(`/courses/${courseId}`);
      const tempCourse= this.courses.filter((course) => course._id !== courseId);
      console.log(tempCourse)
      this.courses =tempCourse
      navigation.navigate("CourseList");
    } catch (error) {
      console.log(
        "🚀 ~ file: courseStore.js ~ line 26 ~ courseStore ~ deleteCourse= ~ error",
        error
      );
    }
  };
}

const courseStore = new CourseStore();
courseStore.fetchCourse();
export default courseStore;
