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
  createCourse = async (course, navigation) => {
    try {
      const formData = new FormData();
      for (const key in course) formData.append(key, course[key]);

      const res = await api({
        method: "POST",
        url: "/courses",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: (data, error) => {
          return formData;
        },
      });
      this.fetchCourse();
      navigation.navigate("Drawer");
      this.course = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
}

const courseStore = new CourseStore();
courseStore.fetchCourse();
export default courseStore;
