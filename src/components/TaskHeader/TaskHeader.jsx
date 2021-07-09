import s from './TaskHeader.module.scss';

const TaskHeader = ({ currSprint, toggleModal, filter, onChange }) => {
  return (
    <div className={s.wrapper_all}>
      <div className={s.wrapper_wr}>
        <div className={s.wrapper_tasks}>
          <h1 className={s.sprint_name}>{currSprint?.title}</h1>
          <button className={s.edit_sprint_name_button}></button>
        </div>
        <div className={s.wrap_tasks}>
          <button onClick={toggleModal} className={s.add_task_button}></button>
          <p className={s.task_name}>Create a task</p>
        </div>
      </div>
      <div className={s.table_list_wrapper}>
        <ul className={s.table_list}>
          <li className={s.table_item}>
            <p className={s.table_title}>Task</p>
          </li>
          <li className={s.table_item}>
            <p className={s.table_title}>Scheduled hours</p>
          </li>
          <li className={s.table_item}>
            <p className={s.table_title}>Spent hour / day</p>
          </li>
          <li className={s.table_item}>
            <p className={s.table_title}>Hours spent</p>
          </li>
        </ul>
        <form className={s.search_form} onSubmit={1}>
          <input
            className={s.search_form_input}
            type="text"
            name="filter"
            placeholder=""
            value={filter}
            onChange={onChange}
            // name="name"
          />
          <button type="submit" className={s.search_form_button}></button>
        </form>
      </div>
    </div>
  );
};

export default TaskHeader;