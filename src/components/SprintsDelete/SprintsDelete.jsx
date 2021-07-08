import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectsSelectors } from '../../redux/projects';
import authSelectors from '../../redux/auth/auth-selectors';
import { sprintsOperations } from '../../redux/sprints';
import Modal from '../Modal';
import s from './SprintsDelete.module.scss';

const SprintsDelete = ({ sprints, delAll, prId }) => {
  const dispatch = useDispatch();

  const userId = useSelector(authSelectors.getUserId);
  // console.log('userId', userId);

  const projects = useSelector(projectsSelectors.getProjects);
  const ownerId = projects?.map(project => project.owner);
  // console.log('ownerId:', ownerId[0]);

  const isOwner = JSON.stringify(userId) === JSON.stringify(ownerId[0]);
  // console.log('SprintsDelete', isOwner);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  const handleDelete = () => {
    delAll(prId);
    setTimeout(() => {
      dispatch(sprintsOperations.getSprints(prId));
    }, 500);
    toggleModal();
  };

  return (
    <div>
      {isOwner && (
        <div className={s.btnWrapper}>
          <button
            className={s.btnDel}
            type="button"
            onClick={toggleModal}
          ></button>
          <p className={s.textDell}>Delete all</p>
        </div>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div className={s.modal_delete}>
            <h2 className={s.title}>Delete all sprints</h2>
            <p className={s.text}>
              Are you sure, you want to delete all sprints?
            </p>
            <button
              className={s.modal_btnDel}
              type="button"
              onClick={handleDelete}
            ></button>
            <p className={s.textBtn}>Delete all</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SprintsDelete;
