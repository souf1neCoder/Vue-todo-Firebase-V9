<template>
  <div class="container" style="padding-bottom:100px">
    <div class="row mt-5">
      <div class="col-lg-10 col-sm-12 mx-auto">
        <div class="badges mb-4">
          <div class="my_badge finish" title="Finished">
            <i class="fas fa-check"></i>
            <span>{{ finished }}</span>
          </div>
          <div class="my_badge ml-3 unfinish" title="Unfinished">
            <i class="fas fa-stopwatch"></i>
            <span>{{ unfinished }}</span>
          </div>
        </div>
        <div v-if="tasks.length === 0" class="no_tasks mt-5 w-100 text-center">
          <p><b>No Tasks Yet.</b></p>
        </div>

        <ul v-else class="tasks mb-2">
          <li v-for="task in tasks" class="mb-2" :key="task.id">
            <a
              class="link_task"
              data-toggle="collapse"
              :href="'#collapseExample' + task.id"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <div class="task row justify-content-between align-items-center">
                <div class="col-lg-10">
                  <h5 class="task_title">
                    <span>{{ task.dateAt }}</span> - {{ task.title }}
                  </h5>
                </div>
                <div class="col-lg-2">
                  <div class="btns">
                    <button
                      class="btn_delete"
                      title="delete"
                      @click="deleteTask(task.id)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <button
                      title="done"
                      class="btn_done"
                      @click="doneTask(task.id)"
                    >
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            </a>
            <div class="collapse" :id="'collapseExample' + task.id">
              <div class="card_description">
                <p class="task_description">{{ task.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db, { colRef } from "@/firebase.js";

import {
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { auth } from "@/firebase.js";
export default {
  data() {
    return {
      tasks: [],
      done: 0,
    };
  },
  methods: {
    deleteTask(id) {
      const docRef = doc(db, "tasks", id);
      deleteDoc(docRef).then(() => {
        // 
      });
    },
    doneTask(id) {
      this.deleteTask(id);
      this.done += 1;
    },
  },
  created() {
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("userId", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (snapshot) => {
      this.tasks = [];
      snapshot.docs.forEach((doc) => {
        this.tasks.push({ ...doc.data(), id: doc.id });
      });
     
    });
  },
  computed: {
    unfinished() {
      return this.tasks.length;
    },
    finished() {
      return this.done;
    },
  },
};
</script>

<style></style>
