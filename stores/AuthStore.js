import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import courseStore from "./courseStore";

class AuthStore {
  user = null;
  loading = true;
  profileLoading = true;
  profile = null;
  constructor() {
    makeAutoObservable(this, {});
  }
  fetchUserProfile = async () => {
    try {
      const res = await api.get("/profiles");
      this.profile = res.data;
      this.profileLoading = false;
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllProfiles = async () => {
    try {
      const res = await api.get("/profiles/allprofiles");
      this.profile = res.data;
      this.profileLoading = false;
    } catch (error) {
      console.log(error);
    }
  };
  setUser = (token) => {
    AsyncStorage.setItem("myToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);

    // if (this.user.type === "student" && this.profile) {
    //   this.fetchUserProfile();
    //   this.profileLoading = false;
    // } else if (this.user.type === "admin" && this.profile) {
    //   this.fetchAllProfiles();
    //   this.profileLoading = false;
    // }
  };

  Signin = async (data, navigation, toast) => {
    try {
      const resp = await api.post("/user/signin", data);
      this.setUser(resp.data.token);
      courseStore.fetchCourse();
      navigation.navigate("Drawer");
      toast.show({
        title: "Sign in Successfully",
        status: "success",
      });
    } catch (error) {
      toast.show({
        title: "Sign in Failed",
        status: "error",
      });
      console.log(error);
    }
  };

  Signup = async (data, navigation, toast) => {
    try {
      const user = { staffId: data.staffId, password: data.password };
      const resp = await api.put("/user", user);
      this.setUser(resp.data.token);
      navigation.navigate("Drawer");
      toast.show({
        title: "Sign in Successfully",
        status: "success",
      });
      courseStore.fetchCourse();
    } catch (error) {
      toast.show({
        title: "Sign in Failed",
        status: "error",
      });
      console.log(error);
    }
  };
  signOut = async () => {
    delete api.defaults.headers.common.Authorization;
    this.user = null;
    await AsyncStorage.removeItem("myToken");
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const exp = decode(token).exp;
      if (exp > currentTime) {
        this.setUser(token);
      } else {
        this.signOut();
      }
    } else {
      this.signOut();
    }
  };
}
const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
