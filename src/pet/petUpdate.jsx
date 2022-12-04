import Api from '../api/api';
import database from '../api/firebase-config';

export function isUpdateTime({ nextUpdate }) {
  const currentDate = new Date();
  const checkDate = new Date(nextUpdate);

  return currentDate.getTime() >= checkDate.getTime();
}

export function checkTasks(uid, { health }, onHealthChange) {
  const taskdate = '2022-11-15';

  const api = new Api({ db: database });

  api.getTasksByDate(uid, '1970', taskdate).then(tasksList => {
    const toPenalize = tasksList.filter(task => !task.done && !task.penalized);
    const penalty = toPenalize.length * 5;
    if (penalty) onHealthChange(health - penalty);
    tasksList.forEach(task => api.editTask(uid, { id: task.id, taskdate, penalized: true }));
  });
}

export function checkAge({ birthday, health }) {
  const petAge = Math.floor((new Date() - new Date(birthday)) / (1000 * 3600 * 24));

  if (petAge >= 7) {
    return { stage: 'adult', health: health + 50 };
  } else if (petAge >= 3) {
    return { stage: 'teen', health: health + 25 };
  } else {
    return { stage: 'child', health: health };
  }
}
