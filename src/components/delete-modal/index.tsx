import { Modal } from 'antd'
import { useTranslation } from 'react-i18next';


interface Props {
  openModal: boolean;
  hideModal: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<Props> = ({ openModal, hideModal, handleDelete }) => {
  const { t } = useTranslation('auth');
  return (
    <Modal
      title={t("title.delete")}
      open={openModal}
      onOk={() => {
        handleDelete();
        hideModal();
      }}
      onCancel={hideModal}
      okText={t("btn.delete")}
      cancelText={t("btn.cancel")}
      okButtonProps={{
        className: "text-white bg-rose-500 border-rose-500 hover:bg-rose-500",
      }}
    >
      <span>{t("noti.delete_todo")}</span>
    </Modal>
  )
}

export default DeleteModal
