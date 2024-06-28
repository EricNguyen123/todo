import { FloatButton } from 'antd'
import Header from './header'
import ListItems from './list-items'
import { PlusOutlined } from '@ant-design/icons'
import FormAdd from './form-add'
import { useState } from 'react'

const TodoList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClick = () => {
    setOpenModal(true)
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  return (
    <div>
      <Header/>
      <ListItems/>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ 
          right: 50,
          bottom: 20,
        }}
        icon={<PlusOutlined />}
        onClick={onClick}
      />
      <FormAdd isEdit={false} openModal={openModal} hideModal={hideModal}/>
    </div>
  )
}

export default TodoList
