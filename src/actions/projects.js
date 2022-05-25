import types from "./types.js";
import axios from "axios";

import {
  throwCreateProjectError,
  removeCreateProjectError,
  throwDeleteProjectError,
  removeDeleteProjectError,
} from "./errors.js";

const createProject = (projectData) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.post(
        "http://localhost:3000/projects",
        projectData,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      await dispatch({
        type: types.CREATE_PROJECT,
        payload: response.data,
      });

      dispatch(removeCreateProjectError());
    } catch (e) {
      dispatch(throwCreateProjectError(e.response.data));
    }
  };
};

const editProject = (projectId, projectData) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.patch(
        `http://localhost:3000/projects/${projectId}`,
        projectData,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      await dispatch({
        type: types.EDIT_PROJECT,
        payload: response.data,
      });

      dispatch(removeCreateProjectError());
    } catch (e) {
      console.log(e);
      dispatch(throwCreateProjectError(e.response.data));
    }
  };
};

const fetchProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}`,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      await dispatch({
        type: types.FETCH_PROJECT,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.delete(
        `http://localhost:3000/projects/${projectId}`,
        {
          headers: {
            authorization: `bearer ${userInfo.token}`,
          },
        }
      );

      await dispatch({
        type: types.DELETE_PROJECT,
        payload: projectId,
      });

      dispatch(removeDeleteProjectError());
    } catch (e) {
      console.log(e);
      dispatch(throwDeleteProjectError());

      return "error";
    }
  };
};

const fetchProjects = () => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().userInfo;

      const response = await axios.get("http://localhost:3000/projects", {
        headers: {
          authorization: `bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: types.FETCH_PROJECTS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export {
  createProject,
  editProject,
  deleteProject,
  fetchProject,
  fetchProjects,
};