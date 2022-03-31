import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import courseStore from "./courseStore";

class RequestStore {
  requests = [];
  loading = true;

  constructor() {
    makeAutoObservable(this, {});
  }
  fetchUserProfile = async () => {
    try {
      const res = await api.get("/requests");
      console.log(
        "🚀 ~ file: requestStore.js ~ line 17 ~ RequestStore ~ fetchUserProfile= ~ res",
        res.data
      );
      this.requests = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
}
const requestStore = new RequestStore();

export default requestStore;
