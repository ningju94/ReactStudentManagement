import axios from 'axios';

import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_COURSES: 'course/GET_COURSES',
  CLEAR_COURSES: 'course/CLEAR_COURSES'
};

const initialState = {
  courses: []
};

export type ApplicationCourseState = Readonly<typeof initialState>;

export default (state: ApplicationCourseState = initialState, action): ApplicationCourseState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_COURSES):
      return {
        ...state,
        courses: action.payload.data
      };
    case ACTION_TYPES.CLEAR_COURSES:
      let newState = { ...state };
      delete newState.courses;
      return {
        ...newState
      };
    default:
      return state;
  }
};

export const getCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_COURSES,
    payload: axios.get('api/course/findAllCourses')
  });

export const clearCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.CLEAR_COURSES
  });
