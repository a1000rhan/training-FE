import { NavigationContainer } from "@react-navigation/native";
import { makeAutoObservable, configure } from "mobx";
import api from "./api";
configure({
  enforceActions: "never",
});

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
      const tempCourse = this.courses.filter(
        (course) => course._id !== courseId
      );
      console.log(tempCourse);
      this.courses = tempCourse;
      navigation.navigate("CourseList");
    } catch (error) {
      console.log(
        "🚀 ~ file: courseStore.js ~ line 28 ~ CourseStore ~ deleteCourse ~ error",
        error
      );
    }
  };
  createCourse = async (course, navigation) => {
    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("time", course.time);
      formData.append("date", course.date);
      formData.append("location", course.location);
      formData.append("maxSeats", course.maxSeats);
      formData.append("image", course.image);
      course.skills.map((skill) => formData.append("skills", skill));
      console.log(
        "🚀 ~ file: courseStore.js ~ line 47 ~ CourseStore ~ createCourse= ~ formData",
        formData
      );

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
      console.log(
        "🚀 ~ file: courseStore.js ~ line 26 ~ courseStore ~ deleteCourse= ~ error",
        error
      );
    }
  };
  joinCourse = async (course, navigation, toast) => {
    try {
      const res = await api.post(`/courses/${course._id}`);
      console.log(
        "🚀 ~ file: courseStore.js ~ line 78 ~ CourseStore ~ joinCourse= ~ res",
        res.data
      );
      const tempArr = this.courses.map((course) =>
        course._id === res.data._id ? res.data : course
      );

      this.courses = tempArr;
      toast.show({
        title: "You Enrolled Successfully",
        status: "success",
        placement: "top",
      });
      navigation.navigate("CourseList");
    } catch (error) {
      console.log(error);
      toast.show({
        title: "You already Enrolled",
        status: "error",
      });
    }
  };
}

const courseStore = new CourseStore();
export default courseStore;
