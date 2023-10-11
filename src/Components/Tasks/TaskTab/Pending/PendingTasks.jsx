// PendingTasksComponent.js
import React, { useState, useEffect, useContext } from 'react'; // Add useState, useEffect
import Product from '../../ProductContainer';
import { AuthContext } from '../../../Context/AuthContext';
import boxbox from '../../../assets/box-box.png';
import LoadLoader from '../../../Loader/ClipsLoader'; // Import the loader
import { useTranslation } from 'react-i18next';

const PendingTasksComponent = ({ tasks, onTasksUpdated  }) => {
  const { updateBalance, user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);  // Create a loading state
  const [shouldRefreshTasks, setShouldRefreshTasks] = useState(false);


  useEffect(() => {
    if (tasks) {
      setIsLoading(false);  // Set loading to false once tasks are present
    }
  }, [tasks]);

  const handleComplete = () => {
    updateBalance();
    onTasksUpdated(); 

  };
  const { t } = useTranslation();

  

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

  return (
    <div className="product-container">
      {tasks?.map(task => (
        <Product key={task.id} task={task} onComplete={handleComplete} />
      ))}
    </div>
  );
};

export default PendingTasksComponent;
