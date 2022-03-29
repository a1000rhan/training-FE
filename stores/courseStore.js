import { NavigationContainer } from "@react-navigation/native";
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
  createCourse = async (course) => {
    try {
      const res = await api.post("/courses", course);
      this.courses = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
  joinCourse = async (course, navigation) => {
    try {
      const res = await api.post(`/courses/${course._id}`);
      const tempArr = this.courses.map((course) =>
        course._id === res.data._id ? res.data : course
      );
      this.courses = tempArr;
      navigation.navigate("CourseList");
    } catch (error) {
      console.log(error);
    }
  };
}

const courseStore = new CourseStore();
courseStore.fetchCourse();
export default courseStore;
