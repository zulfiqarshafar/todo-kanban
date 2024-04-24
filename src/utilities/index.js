export const sortData = (taskList) => {
  taskList.sort((a, b) => {
    const dateA = a.created_at;
    const dateB = b.created_at;
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