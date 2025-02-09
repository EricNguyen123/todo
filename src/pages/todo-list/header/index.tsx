import { Button, Select } from 'antd'
import { useState } from 'react'
import FormAdd from '../form-add';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { getTodo } from '../../../redux/todo/actions';
import { optionSortTodoList, SelectTodoOptions } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import config from '../../../config';
import { SelectTodo } from '../../../common/general';
import classNames from 'classnames';
import CalendarCus from '../calendar';

const { Search } = Input;


const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalCalendar, setOpenModalCalendar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('todo');
  const navigate = useNavigate();

  const onSearch: SearchProps['onSearch'] = (value) => {
    navigate(config.routes.todo_list + `?key=all${value && `&search=${value}`}`)
  };

  const onClick = () => {
    setOpenModal(true)
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  const handleChange = (value: string) => {
    dispatch(getTodo({
      sortBy: SelectTodoOptions[value].sortBy,
      order: SelectTodoOptions[value].order,
    }))
  };

  const hideModalCalendar = () => {
    setOpenModalCalendar(false);
  }

  const handleCalendar = () => {
    setOpenModalCalendar(true);
  }

  return (
    <div className="w-full flex items-center justify-between mb-[30px] pt-[30px] pl-[20px] pr-[20px]">
      <div>
        <span className="text-center text-base font-semibold">{t("main.header_title")}</span>
      </div>
      <div>
        <Search 
          placeholder={t("search.placeholder")}
          onSearch={onSearch} 
          allowClear
          className="w-search"
        />
      </div>
      <div className="flex items-center justify-between">
        <Select
          defaultValue={SelectTodo.TITLE}
          style={{ 
            width: 180,
            marginRight: 20,
          }}
          onChange={handleChange}
          options={optionSortTodoList()}
        />
        <Button className="mr-[5px]" onClick={handleCalendar}>
          <CalendarOutlined />
        </Button>
        <Button type="primary" className={classNames('bg-btn-default', 'hover:bg-btn-hover')} onClick={onClick}> 
          <PlusOutlined className="mr-[3px]"/>{t("btn.add")}
        </Button>
      </div>
      <FormAdd isEdit={false} openModal={openModal} hideModal={hideModal}/>
      <CalendarCus openModal={openModalCalendar} hideModal={hideModalCalendar}/>
    </div>
  )
}

export default Header
