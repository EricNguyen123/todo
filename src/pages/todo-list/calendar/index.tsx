import { Badge, BadgeProps, Calendar, CalendarProps, Modal } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { convertDayjsToDate, getMonthYear } from '../../../utils/handlerDate';
import { useNavigate } from 'react-router';
import config from '../../../config';
import { getTodo } from '../../../redux/todo/actions';
import { DateFormat } from '../../../common/general';


interface Props {
  openModal: boolean;
  hideModal: () => void;
}

const CalendarCus: React.FC<Props> = ({ openModal, hideModal }) => {
  const [mode, setMode] = useState<string>(DateFormat.MONTH);
  const todoSelector = useSelector(({ todo }: any) => todo);
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    openModal && dispatch(getTodo({}))
  }, [openModal])

  useEffect(() => {
    if (todoSelector && todoSelector.todos) {
      setTodos(todoSelector.todos);
    }
  }, [todoSelector]);

  const onSelect = (newValue: Dayjs, info: { source: string }) => {
    const date = convertDayjsToDate(newValue);
    if (mode === DateFormat.MONTH && info.source === DateFormat.DATE) {
      navigate(config.routes.todo_list + `?key=all${date && `&search=${date}`}`);
      hideModal();
    } else if (mode === DateFormat.YEAR && info.source === DateFormat.MONTH) {
      const parts = date.split('/');
      const month = parts[1];
      const year = parts[2];
      navigate(config.routes.todo_list + `?key=all${date && `&search=${month}/${year}`}`);
      hideModal();
    }
  };

  const onPanelChange = (_, newMode: string) => {
    setMode(newMode);
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month flex text-base font-medium">
        <section className="mr-[5px]">{num}</section>
        <span>events.</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item: any, index) => (
          <li key={index}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const getListData = (value: Dayjs) => {
    let listData: { type: string; content: string }[] = []; 
    const date = convertDayjsToDate(value);
    listData = todos.filter((i: any) => i.date === date)
                    .map((i: any) => { 
                      if (i.isComplete) {
                        return { type: 'success', content: i.title }
                      }
                      return { type: 'warning', content: i.title }
                    })
    return listData || [];
  }

  const getMonthData = (value: Dayjs) => {
    const monthCus = getMonthYear(value);
    if (monthCus) {
      const listData = todos.filter((i: any) => {
        const parts = i.date.split('/');
        const month = parts[1];
        const year = parts[2];
        return `${month}/${year}` === monthCus;
      })
      return listData.length;
    }
  };
  
  return (
    <Modal
      className="custom-calendar"
      open={openModal}
      onOk={() => {
        hideModal();
      }}
      onCancel={hideModal}
      footer={""}
    >
      <div className="overflow-auto mt-[20px] pl-[20px] pr-[20px]">
        <div className="h-[500px]">
          <Calendar
            onSelect={onSelect} 
            onPanelChange={onPanelChange} 
            cellRender={cellRender}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CalendarCus
