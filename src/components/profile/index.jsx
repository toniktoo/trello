import React from 'react';
import styles from './Profile.module.css';
import foto from './user.png';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

export const ProfileUser = () => {
  const { displayName, email, login, sex, age, city, avatarUrl } = useSelector(
    (state) => state.firebase.profile
  );
  return (
    <div className={styles.profile}>
      {/* <TitleContent title="Профиль пользователя" /> */}
      <div className={styles.content}>
        <div className={styles.blockFoto}>
          <img
            src={avatarUrl || foto}
            alt="foto-user"
            className={styles.userFoto}
          ></img>
          <div className={styles.blockFotoBtns}>
            <Button type="primary" className={styles.btnUnderFoto}>
              Загрузить фото
            </Button>
            <Button type="primary" className={styles.btnUnderFoto}>
              Редактировать
            </Button>
          </div>
        </div>
        <div className={styles.blockInfo}>
          <h1 className={styles.username}>Никита Толмачев</h1>
          <ul className={styles.info}>
            <div className={styles.titleMain}>Общее</div>
            <li className={styles.infoItem}>
              <h3>Email: {email}</h3>
            </li>
            <li className={styles.infoItem}>
              <h3>Login: {login}</h3>
            </li>
            <li className={styles.infoItem}>
              <h3>Full name: {displayName}</h3>
            </li>

            <li className={styles.infoItem}>
              <h3>Sex: {sex}</h3>
            </li>
            <li className={styles.infoItem}>
              <h3>Age: {age}</h3>
            </li>
            <li className={styles.infoItem}>
              <h3>City: {city}</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
