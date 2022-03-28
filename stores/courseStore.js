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
}

const courseStore = new CourseStore();

export default courseStore;
