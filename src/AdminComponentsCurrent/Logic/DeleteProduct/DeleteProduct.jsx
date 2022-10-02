import React from 'react';
import SendingBar from '../../UI/SendingBar/SendingBar';
import styles from './DeleteProduct.module.scss';

function DeleteProduct({
  hiddenValue,
  item,
  handleCloseDelete,
  handleDeleteProduct,
  isSendingDelete,
}) {
  return (
    <div hidden={hiddenValue} className={styles.deleteproduct}>
      <div className={styles.wrapper}>
        {isSendingDelete ? (
          <div className={styles.body}>
            <p>
              Товар{' '}
              <strong>
                ID #{item.id} ({item.name})
              </strong>{' '}
              Удален
            </p>
            <SendingBar />
          </div>
        ) : (
          <div className={styles.body}>
            <p>
              Действительно удалить товар{' '}
              <strong>
                ID #{item.id} ({item.name})
              </strong>
              ? <br />
              Отменить данное действие будет невозможно
            </p>
            <div className={styles.buttons}>
              <button onClick={() => handleCloseDelete()} className={styles.cancel}>
                Отмена
              </button>
              <button onClick={() => handleDeleteProduct(item)} className={styles.accept}>
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteProduct;
