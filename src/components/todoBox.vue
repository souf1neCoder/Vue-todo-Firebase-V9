<template>
  <div class="container"  style="padding-bottom:100px">
    
    <div class="row mt-3">
      <div class="col-lg-8 col-sm-12 mx-auto">
        <div class="alert-space my-2">
          <div
            v-if="isAdded.state"
            :class="isAdded.class"
            class="alert alert-dismissible fade show"
            role="alert"
          >
            <strong>{{ isAdded.message }}</strong>
            <button
              type="button"
              @click="hiddenAlert"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <router-link class="btn btn-light mb-3" to="/dodolist">My Tasks</router-link>
        <h6 class="time-line">
          <time>{{ dateToday }}</time>
        </h6>
        <div class="box-task mt-3 rounded">
          <form @submit.prevent="addTask" class="add">
            <div class="form-group">
              <label for="title"
                >Task Title <span style="color: red">*</span></label
              >
              <input
                type="text"
                maxlength="50"
                class="form-control"
                id="title"
                v-model="task.title"
              />
            </div>
            <div class="form-group">
              <label for="description">Task Description</label>
              <textarea
                v-model="task.description"
                class="form-control"
                id="description"
                rows="2"
              ></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn_add">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { colRef } from "@/firebase.js";
import {
  serverTimestamp,
  addDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { auth } from "@/firebase.js";

export default {
  data() {
    return {
      dateToday: "",
      task: {
        title: "",
        description: "",
        dateAt: "",
        createdAt: serverTimestamp(),
        userId:""
      },
      isAdded: {
        state: false,
        message: "",
        class: "",
      },
      taskFound:false
    };
  },
  methods: {
    // Add task method
    async addTask() {
    

      // check if title empty
       if (this.task.title === "") {
        this.showAlert("Task Title is Required", "alert-danger");
      }
      // title not empty
      else{
         // check if task exist
      const q = query(colRef, where("title", "==", this.task.title),where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(this.taskFound){
          return;
        }
        if (doc.data().title === this.task.title) {
          this.taskFound = true;
          return;
        }
       
      });
    
      // task already exist
      if(this.taskFound){
        this.showAlert("Task Already Exist", "alert-danger");
        this.taskFound = false;

      }
      // task not exist
      else{

        //  datetime

        const current = new Date();
        const datetime =
          current.getDate().toString().padStart(2, 0) +
          "-" +
          (current.getMonth() + 1) +
          "-" +
          current.getFullYear() +
          " " +
          current.getHours().toString().padStart(2, 0) +
          ":" +
          current.getMinutes().toString().padStart(2, 0);
        this.task.dateAt = datetime;
        this.task.userId = auth.currentUser.uid;
       
        //  add task
        await addDoc(colRef, this.task).then(() => {
          this.showAlert("Task Added Successfully", "alert-success");
          // reset form
          this.task.title = ""
          this.task.description = ""
        });
      
      
      }
      }
     
    },
    showAlert(msg, className) {
      this.isAdded.state = true;
      this.isAdded.message = msg;
      this.isAdded.class = className;
      this.timeAlert();
    },
    hideAlert() {
      this.isAdded.state = false;
      this.isAdded.message = "";
      this.isAdded.class = "";
    },
    timeAlert() {
      setTimeout(() => {
        this.hideAlert();
      }, 3000);
    },
  },
  created() {
    
    let current = new Date();
    this.dateToday =
      current.getDate().toString().padStart(2, 0) +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getFullYear() +
      " " +
      current.getHours().toString().padStart(2, 0) +
      ":" +
      current.getMinutes().toString().padStart(2, 0);
  },
};
</script>

<style></style>
