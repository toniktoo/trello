import React from 'react';

import { Button, Modal } from 'antd';

export const ModalAction = ({
  title,
  isShow,
  handleOk,
  textBtnOk,
  handleCancel,
  children,
}) => {
  return isShow ? (
    <Modal
      centered
      visible={isShow}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Назад
        </Button>,
        <Button key="submit" type="danger" onClick={handleOk}>
          {textBtnOk}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  ) : null;
};
