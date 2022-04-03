import { makeAutoObservable, configure } from "mobx";
import decode from "jwt-decode";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import courseStore from "./courseStore";

configure({
  enforceActions: "never",
});
class RequestStore {
  requests = [];
  allRequests = [];
  loading = true;

  constructor() {
    makeAutoObservable(this, {});
  }
  fetchRequests = async () => {
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

  fetchAllRequests = async () => {
    try {
      const res = await api.get("/requests/all");

      this.allRequests = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  approveCourse = async (reqId, toast) => {
    try {
      const res = await api.post(`/requests/${reqId}`);
      const tempArr = this.allRequests.map((request) =>
        request._id === reqId
          ? { ...request, status: res.data.status }
          : request
      );

      this.allRequests = tempArr;
      this.loading = false;
      toast.show({
        title: "This Course is Approved",
        placement: "top",
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: requestStore.js ~ line 31 ~ RequestStore ~ approveCourse= ~ error",
        error
      );
    }
  };
  rejectRequest = async (reqId, toast) => {
    try {
      const res = await api.post(`/requests/${reqId}/reject`);
      const tempArr = this.allRequests.map((request) =>
        request._id === reqId
          ? { ...request, status: res.data.status }
          : request
      );

      this.allRequests = tempArr;
      this.loading = false;
      this.fetchRequests();
      toast.show({
        title: "This Course is Rejected",
        status: "error",
        placement: "top",
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: requestStore.js ~ line 31 ~ RequestStore ~ approveCourse= ~ error",
        error
      );
    }
  };
}
const requestStore = new RequestStore();

export default requestStore;
