import React, { useState, useEffect } from 'react';
import './completedtasks.css';
import LoadLoader from '../../../Loader/ClipsLoader'; // Import the loader
import boxbox from '../../../assets/box-box.png';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const CompletedTasks = ({ tasks }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (tasks) {
      setIsLoading(false);
    }
  }, [tasks]);

  if (isLoading) {
    return <LoadLoader color="#000" size={30} width={4} />;
  }

  if (tasks.length === 0) {
    return (
      <div className="no-data-container">
        <img src={boxbox} alt="No data" className="no-data-background" />
        <p className="no-data-message">{t('TaskTab.nodata')}</p>
      </div>
    );
  }
  // If there are tasks, render them as usual
  return (
    <div>
      {tasks.map((task) => (
        <div className="completed-task" key={task.id}>
          <img className="completed-task-image" src={task.image} alt={task.task_type} />
          <div className="completed-task-info">
            <h5 className="completed-task-title">{task.task_type}</h5>
            <p className="completed-task-description">{t('TaskTab.price')}: ${task.price}</p>
            <p className="completed-task-commission">{t('TaskTab.Commission')}: ${task.commission} ({task.commission_percentage}%)</p>
            <p className="completed-task-date">{t('TaskTab.Completedon')}: {new Date(task.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
