import { Button, Select } from 'antd'
import { useState } from 'react'
import FormAdd from '../form-add';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { getTodo } from '../../../redux/todo/actions';
import { optionSortTodoList } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;


const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('todo');
  const onSearch: SearchProps['onSearch'] = (value) => {
    dispatch(getTodo({
      searchValue: value.trim(),
    }))
  };

  const onClick = () => {
    setOpenModal(true)
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  const handleChange = (value: string) => {
    const sortBy = value === '0' ? 'title' : 'date';
    const order = value === '0' ? 'asc' : value === '1' ? 'desc' : 'asc';
    dispatch(getTodo({
      sortBy: sortBy,
      order: order,
    }))
  };

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
          style={{ 
            width: 320,
          }} 
        />
      </div>
      <div className="flex items-center justify-between">
        <Select
          defaultValue='0'
          style={{ 
            width: 180,
            marginRight: 20,
          }}
          onChange={handleChange}
          options={optionSortTodoList()}
        />
        <Button type="primary" onClick={onClick}> 
          <PlusOutlined className="mr-[3px]"/>{t("btn.add")}
        </Button>
      </div>
      <FormAdd isEdit={false} openModal={openModal} hideModal={hideModal}/>
    </div>
  )
}

export default Header
