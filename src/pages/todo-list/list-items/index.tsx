import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo, deleteTodo, putTodo } from '../../../redux/todo/actions';
import { Card, Checkbox, Empty, message, Pagination } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Item from '../item';
import DeleteModal from '../../../components/delete-modal';
import FormAdd from '../form-add';
import HomeSkeleton from '../../../components/skeleton/home-skeleton';
import { useTranslation } from 'react-i18next';
import { formatRelativeTime, getCurrentDate, getTomorrowDate } from '../../../utils/handlerDate';
import { useLocation } from 'react-router';
import { keyParams, stylesBorderCardTodo, stylesCardTodo } from '../../../constants';
import { Complete, RelativeTime } from '../../../common/general';
import classNames from 'classnames';

const ListItems = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const todoSelector = useSelector(({ todo }: any) => todo);
  const [todos, setTodos] = useState([]);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [todo, setTodo] = useState({});
  const [deleteTodoList, setDeleteTodoList] = useState({ id: ''});
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [editValue, setEditValue] = useState({ id: "", title: "", content: "", date: "", time: "" });
  const { t } = useTranslation('auth');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const duration = import.meta.env.VITE_REACT_APP_DURATION;
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get('key');
  const searchValue = queryParams.get('search');

  const onClick = () => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  }

  const handleCheckboxChange = (checkedValues: any) => {

    const addedIds = checkedValues.filter((id: any) => !checkedList.find(i => parseInt(id, 10) === i));
    const removedIds = checkedList.filter(id => !checkedValues.find((i: any) => id === parseInt(i, 10)));

    addedIds.forEach((id: any) => updateTodoStatus(parseInt(id, 10), true));
    removedIds.forEach(id => updateTodoStatus(id, false));

    setCheckedList(checkedValues);
  };

  const updateTodoStatus = (id: number, isComplete: boolean) => {
    const item = todoSelector.todos.find((i: any) => parseInt(i.id, 10) === id);
    const handleIsComplete = () => {
      setComplete(false)
    }
    if (item) {
      setComplete(true)
      dispatch(putTodo({
        ...item,
        isComplete: isComplete ? 1 : 0,
        handleIsComplete,
      }));
    }
  };

  useEffect(() => {
    if (key) {
      let date = "";
      let isComplete = null;

      if (key === keyParams.today) {
        date = getCurrentDate();
      } else if (key === keyParams.tomorrow) {
        date = getTomorrowDate();
      } else if (key === keyParams.accomplished) {
        isComplete = 1;
      }

      searchValue ? 
      dispatch(getTodo({
        searchValue: searchValue.trim(),
      })) :
      dispatch(getTodo({date, isComplete}))
    }
  }, [key, searchValue]);

  useEffect(() => {
    if (todoSelector && todoSelector.todos) {
      setTodos(todoSelector.todos);
      const checkedItems = todoSelector.todos
        .filter((i: any) => i.isComplete)
        .map((i: any) => parseInt(i.id, 10));
      setCheckedList(checkedItems);
    }

    if (todoSelector && todoSelector.todo && todoSelector.todo.isDelete ) {
      todoSelector.todo.isDelete = false;
      message.success({
        content: t("message.delete_success"),
        duration: duration,
        style: {
          marginTop: '50px',
        },
      })
    }
  }, [todoSelector]);

  const handleDelete = () => {
    dispatch(deleteTodo({ id: deleteTodoList.id }));
  }

  const handleOnDelete = (i: any) => {
    setDeleteTodoList(i);
    setOpenDeleteModal(true);
  }

  const handleOnEdit = (i: any) => {
    setEditValue(i);
    setOpenEditModal(true);
  }

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  }

  const paginatedTodos = todos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <>
      {!complete && todoSelector.loading ? <HomeSkeleton/>: 
      <div>
        {
          paginatedTodos.length > 0 ? (
            <Checkbox.Group 
              style={{ 
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '0 20px'
              }} 
              value={checkedList} 
              onChange={handleCheckboxChange}
            >
              {paginatedTodos.map((todo: any, index) => {
                const formDate = formatRelativeTime(todo.date);
                const styleString = todo.isComplete ? 
                                      stylesCardTodo[Complete.TRUE] : 
                                      stylesCardTodo[formDate.key];
                return (
                <Card 
                  key={index}
                  className={classNames(
                    'w-card-todo',
                    'h-card-todo',
                    'm-auto',
                    {
                      [stylesBorderCardTodo[Complete.TRUE]] : todo.isComplete,
                      [stylesBorderCardTodo[formDate.key]] : !todo.isComplete,
                    }
                  )}
                  
                  title={
                  <div className="flex items-center justify-start">
                    <Checkbox value={parseInt(todo.id, 10)} />
                    <span 
                      className={classNames(
                        'ml-[10px]',
                        'cursor-pointer',
                        'font-semibold',
                        'text-base',
                        'truncate',
                        'w-4/5',
                        `${todo.isComplete && `line-through ${stylesCardTodo[RelativeTime.ACCOMPLISHED]}`}`
                      )}
                      onClick={() => {
                        onClick();
                        setTodo(todo);
                      }}
                    >{todo.title}</span>
                  </div>}
                >
                  <div className="w-full h-[60px] text-ellipsis overflow-hidden">
                    <span className="text-sm" dangerouslySetInnerHTML={createMarkup(todo.content)}></span>
                  </div>
                  <div className="flex items-center justify-between mt-[16px]">
                    <div>
                      <span className={`mr-[10px] ${styleString} ${todo.isComplete && 'line-through'}`}>
                        <CalendarOutlined className="mr-[3px]"/>{formDate.date}
                      </span>
                      <span className={`${stylesCardTodo[RelativeTime.EXIT]} mr-[5px] ${todo.isComplete && 'line-through'}`}>
                        <ClockCircleOutlined className="mr-[3px]"/>{todo.time}
                      </span>
                    </div>
                    <div>
                      <span 
                        className="mr-[10px] cursor-pointer"
                        onClick={() => { handleOnEdit(todo) }}
                      >
                        <EditOutlined />
                      </span>
                      <span 
                        className="cursor-pointer" 
                        onClick={() => { handleOnDelete(todo) }}
                      >
                        <DeleteOutlined className={`${stylesCardTodo[RelativeTime.ACCOMPLISHED]}`}/>
                      </span>
                    </div>
                  </div>
                </Card>
              )})}
            </Checkbox.Group>
          ) : <Empty description={false} />
        }
        <Pagination 
          hideOnSinglePage={true}
          current={currentPage} 
          pageSize={pageSize} 
          total={todos.length} 
          onChange={handlePageChange} 
          style={{ 
            textAlign: 'center', 
            marginTop: '20px',
          }}
          showSizeChanger={false} 
        />
        <Item 
          openModal={openModal} 
          hideModal={hideModal} 
          todo={todo} 
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
        <DeleteModal openModal={openDeleteModal} hideModal={hideModal} handleDelete={handleDelete}/>
        <FormAdd 
          key={editValue.id} 
          isEdit={true} 
          defaultValues={editValue} 
          openModal={openEditModal} 
          hideModal={hideModal} 
        />
      </div>}
    </>
  );
}

export default ListItems;
