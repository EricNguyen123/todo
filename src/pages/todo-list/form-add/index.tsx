import { DatePicker, DatePickerProps, Form, FormProps, Input, Modal, Space, TimePicker, TimePickerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTodo, putTodo } from '../../../redux/todo/actions';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Editor } from '@tinymce/tinymce-react';
import { BoldOutlined, ItalicOutlined, LinkOutlined, PictureOutlined, PlaySquareOutlined, StrikethroughOutlined, UnderlineOutlined } from '@ant-design/icons';
import iconToSvg from '../../../utils/iconToSvg';

interface Props {
  openModal: boolean;
  hideModal: () => void;
  isEdit: boolean;
  defaultValues?: FieldType;
}

type FieldType = {
  id?: string;
  title?: string;
  content?: string;
  date?: string;
  time?: string;
};

const keyTiny = import.meta.env.VITE_REACT_APP_KEY_TINY;

const FormAdd: React.FC<Props> = ({ openModal, hideModal, isEdit, defaultValues }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('todo');
  const [form] = Form.useForm<FieldType>();
  const [time, setTime] = useState<string | string[]>('');
  const [date, setDate] = useState<string | string[]>('');
	const [content, setContent] = useState<string>( defaultValues?.content || '');

  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    setFormValues(defaultValues);
  }, [defaultValues]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    isEdit ? 
      dispatch(putTodo({ 
        ...values, 
        content,
        date: date && date || defaultValues?.date, 
        time: time && time || defaultValues?.time, 
        id: defaultValues?.id 
      })) : 
      dispatch(postTodo({ 
        ...values, 
        content,
        date, 
        time 
      }));
    form.resetFields();
    hideModal();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setDate(dateString);
  };

  const onChangeTime: TimePickerProps['onChange'] = (_, timeString) => {
    setTime(timeString);
  };

  return (
    <Modal
      className="custom-form-add"
      title={isEdit ? t("main.header_edit") : t("main.header_add")}
      open={openModal}
      onOk={() => form.submit()}
      onCancel={hideModal}
      okText={isEdit ? t("btn.save") : t("btn.add")}
      cancelText={t("btn.cancel")}
    >
      <Form
        form={form}
        name={`form-${isEdit ? 'edit' : 'add'}`}
        layout="vertical"
        className="w-[100%] flex items-center justify-center flex-col pt-[20px]"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={
          isEdit && formValues ? 
          {
            title: formValues.title,
            content: formValues.content,
            date: formValues ? dayjs(formValues.date, 'DD/MM/YYYY') : dayjs(new Date()),
            time: formValues ? dayjs(formValues.time, 'HH:mm') : dayjs(new Date()),
          } 
          : {}
        }
      >
        <Form.Item<FieldType>
          name="title"
          className="w-[100%]"
        >
          <Input placeholder={t("input.placeholder_title")} />
        </Form.Item>
        <Form.Item<FieldType>
          name="content"
          className="w-[100%]"
        >
          {/* <Input.TextArea
            style={{
              resize: 'none',
            }}
            placeholder={t("input.placeholder_content")}
            rows={4}
          /> */}
          <Editor
            apiKey={keyTiny}
            init={{
              height: 320,
              placeholder: t("input.placeholder_content"),
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              setup: (editor) => {
                editor.ui.registry.addIcon('bold', iconToSvg(BoldOutlined));
                editor.ui.registry.addIcon('italic', iconToSvg(ItalicOutlined));
                editor.ui.registry.addIcon('underline', iconToSvg(UnderlineOutlined));
                editor.ui.registry.addIcon('strikethrough', iconToSvg(StrikethroughOutlined));
                editor.ui.registry.addIcon('link', iconToSvg(LinkOutlined));
                editor.ui.registry.addIcon('image', iconToSvg(PictureOutlined));
                editor.ui.registry.addIcon('media', iconToSvg(PlaySquareOutlined));
              },
            }}
            initialValue={defaultValues?.content}
            onEditorChange={(newValue,_) => setContent(newValue)}
          />
        </Form.Item>
        <Space
          size={'large'}
          className="w-[100%]"
        >
          <Form.Item<FieldType>
            name="date"
            className="w-[100%]"
          >
            <DatePicker onChange={onChange} format={'DD/MM/YYYY'} />
          </Form.Item>
          <Form.Item<FieldType>
            name="time"
            className="w-[100%]"
          >
            <TimePicker onChange={onChangeTime} format={'HH:mm'} />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default FormAdd;
