import { CalendarOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { formatRelativeTime } from '../../../utils/handlerDate';

interface Props {
  openModal: boolean;
  hideModal: () => void;
  todo: any;
  handleOnDelete: (i: any) => void;
  handleOnEdit: (i: any) => void;
}

const Item: React.FC<Props> = ({ openModal, hideModal, todo, handleOnDelete, handleOnEdit }) => {

  const formDate = formatRelativeTime(todo.date);
  const styleString = formDate.key === '0' ? "text-lime-500" : formDate.key === '1' ? "text-yellow-500" : "";
                
  return (
    <Modal
      title={
        <div className="flex items-center justify-start">
          <span className={`font-semibold text-base truncate w-4/5 ${todo.isComplete && 'text-red-500 line-through'}`}>{todo.title}</span>
        </div>
      }
      open={openModal}
      onCancel={hideModal}
      footer={null}
    >
      <div className="w-full h-[280px] overflow-y-auto">
        <span className="text-sm">{todo.content}</span>
      </div>
      <div className="flex items-center justify-between mt-[16px]">
        <div>
          <span className={`text-slate-400 mr-[10px] ${styleString} ${todo.isComplete && 'line-through'}`}><CalendarOutlined className="mr-[3px]"/>{formDate.date}</span>
          <span className={`text-slate-400 mr-[5px] ${todo.isComplete && 'line-through'}`}><ClockCircleOutlined className="mr-[3px]"/>{todo.time}</span>
        </div>
        <div>
          <span 
            className="mr-[10px] cursor-pointer"
            onClick={() => {
              handleOnEdit(todo)
            }}
          >
            <EditOutlined />
          </span>
          <span 
            className="cursor-pointer" 
            onClick={() => {
              handleOnDelete(todo)
            }}
          >
              <DeleteOutlined />
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default Item;
