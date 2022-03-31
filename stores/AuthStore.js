import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import courseStore from "./courseStore";

class AuthStore {
  user = null;
  loading = true;

  constructor() {
    makeAutoObservable(this, {});
  }
  setUser = (token, type) => {
    AsyncStorage.setItem("myToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  Signin = async (data, navigation, toast) => {
    try {
      console.log(data);
      const resp = await api.post("/user/signin", data);

      this.setUser(resp.data.token);
      navigation.navigate("Drawer");
      this.loading = false;
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

  Signup = async (data, navigation, toast) => {
    try {
      const user = { staffId: data.staffId, password: data.password };
      console.log(user);
      const resp = await api.put("/user", user);
      this.setUser(resp.data.token);
      navigation.navigate("Drawer");
      this.loading = false;
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
  signOut = async (props) => {
    delete api.defaults.headers.common.Authorization;
    this.user = null;
    await AsyncStorage.removeItem("myToken");
    props.navigation.navigate("Home");
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
