import React from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import type { StoreValue } from 'rc-field-form/lib/interface';
import { useDispatch } from 'react-redux';
import { login, signin } from '../../redux/auth/actions';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import config from '../../config';

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  name?: string;
  email?: string;
  remember?: boolean;
};

type AuthProps = {
  mode: 'login' | 'register';
};

const duration = import.meta.env.VITE_REACT_APP_DURATION;

const AuthPage: React.FC<AuthProps> = ({ mode }) => {
  const isLogin = mode === 'login';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  const validatePassword = (value: StoreValue): Promise<void> => {
    if (value.length < 8) {
      return Promise.reject(t("error.password_8_characters"));
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(t("error.password_upcase"));
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(t("error.password_numeric"));
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(t("error.password_special"));
    }
    return Promise.resolve();
  };
  
  const validateConfirmPassword = ({ getFieldValue }: { getFieldValue: (field: string) => StoreValue }) => ({
    validator(value: StoreValue): Promise<void> {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(t("error.password_match"));
    },
  });

  const handleRedirectPage = (path: string) => {
    isLogin ? message.success({
      content: t("message.login_success"),
      duration: duration,
      style: {
        marginTop: '50px',
      },
    }) : message.success({
      content: t("message.register_success"),
      duration: duration,
      style: {
        marginTop: '50px',
      },
    })
    navigate(path);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    isLogin ? 
      dispatch(login({ data: values, handleRedirectPage })) : 
      dispatch(signin({ data: values, handleRedirectPage }))
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return (
    <div className='h-screen flex items-center justify-center bg-zinc-300'>
      <Card title={isLogin ? t("title.login") : t("title.register")}>
        <Form
          name='basic'
          layout='vertical'
          style={{
            width: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t("label.username")}
            name="username"
            rules={[{ required: true, message: t("error.username_required") }]}
            style={{
              width: '100%',
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("label.password")}
            name="password"
            rules={[
              { required: true, message: t("error.password_required") },
              { validator: (_, value) => validatePassword(value) }
            ]}
            style={{
              width: '100%',
            }}
          >
            <Input.Password />
          </Form.Item>

          {!isLogin && (
            <>
              <Form.Item<FieldType>
                label={t("label.confirm_password")}
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: t("error.password_confirm_required") },
                  validateConfirmPassword
                ]}
                style={{
                  width: '100%',
                }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label={t('label.name')}
                name="name"
                style={{
                  width: '100%',
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={t("label.email")}
                name="email"
                rules={[{ required: true, message: t("error.email_required") }]}
                style={{
                  width: '100%',
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={t("label.phone")}
                name="phoneNumber"
                style={{
                  width: '100%',
                }}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {isLogin && (
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              style={{
                width: '100%',
              }}
            >
              <Checkbox>{t("label.remember_me")}</Checkbox>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '380px' }}>
              {isLogin ? t("btn.login") : t("btn.register")}
            </Button>
          </Form.Item>
          <Button type="link" block href={isLogin? config.routes.register : config.routes.login}>
            {!isLogin ? t("btn.login") : t("btn.create_account")}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AuthPage;
