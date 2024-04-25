export const sortData = (taskList) => {
  taskList.sort((a, b) => {
    const dateA = a.updated_at;
    const dateB = b.updated_at;
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }

    return 0;
  });

  return taskList;
}