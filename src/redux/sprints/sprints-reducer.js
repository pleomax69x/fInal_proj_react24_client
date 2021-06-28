import { createReducer } from '@reduxjs/toolkit';
import actions from './sprints-actions';

const {
  getSprintsSuccess,
  addSprintSuccess,
  deleteSprintSuccess,
  editSprintSuccess,
} = actions;

const sprints = createReducer([], {
  [getSprintsSuccess]: (_, { payload }) => payload,
  [addSprintSuccess]: (state, { payload }) => [...state, payload],
  [deleteSprintSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [editSprintSuccess]: (state, { payload }) =>
    state.map(item => {
      if (item.id === payload.id) return payload;
      else return item;
    }),
});

export default sprints;