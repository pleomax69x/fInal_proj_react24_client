import { createSelector } from '@reduxjs/toolkit';

const getIsLoading = state => state.tasks.loading;
const getFilter = state => state.tasks.filter;
const getTasks = state => state.tasks.sprints;

const getVisibleTasks = createSelector(
  [getTasks, getFilter],
  (tasks, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return filter.length > 0
      ? tasks.filter(task => task.name.toLowerCase().includes(normalizedFilter))
      : tasks;
  },
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getIsLoading, getTasks, getVisibleTasks };