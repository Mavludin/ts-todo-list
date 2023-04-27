import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const handleTodoDeletion = (callback: () => void) => {
  confirm({
    title: 'Вы уверены, что хотите удалить данный элемент?',
    icon: <ExclamationCircleOutlined />,
    okType: 'danger',
    onOk() {
      callback();
    },
  });
};
