import axios from "axios";

import types from "./types.js";

import {
  throwTaskCreationError,
  removeTaskCreationError,
  throwDeleteTaskError,
  removeDeleteTaskError,
  throwFetchAllTasksError,
} from "./errors";

const fetchTasks = () => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          authorization: `bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: types.FETCH_ALL_TASKS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch(throwFetchAllTasksError());
    }
  };
};

const createTask = (taskData) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.post(
        "http://localhost:3000/tasks",
        taskData,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: types.CREATE_TASK,
        payload: response.data,
      });

      dispatch(removeTaskCreationError());
    } catch (e) {
      dispatch(throwTaskCreationError(e.response.data));
      return "error";
    }
  };
};

const editTask = (taskId, taskData) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        taskData,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );
      console.log(response);

      dispatch({
        type: types.EDIT_TASK,
        payload: {
          originalTask: response.data.original,
          editedTask: response.data.updated,
        },
      });

      dispatch(removeTaskCreationError());
    } catch (e) {
      dispatch(throwTaskCreationError(e.response.data));
      return "error";
    }
  };
};

const deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: types.DELETE_TASK,
        payload: response.data,
      });

      dispatch(removeDeleteTaskError());
    } catch (e) {
      dispatch(throwDeleteTaskError());

      return "error";
    }
  };
};

const fetchTask = (taskId) => {
  return async (dispatch, getState) => {
    const userInfo = getState().userInfo;

    const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);

    dispatch({
      type: types.FETCH_TASK,
      payload: response.data,
    });
  };
};

export { createTask, fetchTasks, editTask, deleteTask, fetchTask };
