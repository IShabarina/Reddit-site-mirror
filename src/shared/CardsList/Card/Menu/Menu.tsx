import React from 'react';
import styles from './menu.css';

import { Dropdown } from '../../../Dropdown';
import { generateId } from '../../../../utils/react/generateRandomIndex';
import { GenericList } from '../../../../GenericList';
import { Element } from './Element';
import { EIconsComponent, Icon } from '../../../Icon';

const LIST = [
  { As: 'li' as const, className: styles.menu_drop_item, href: '#', element: <Element text='Комментарии' icon={EIconsComponent.comment} /> },
  { As: 'li' as const, className: styles.menu_drop_item, href: '#', element: <Element text='Поделиться' icon={EIconsComponent.share} /> },
  { As: 'li' as const, className: styles.menu_drop_item, href: '#', element: <Element text='Скрыть' icon={EIconsComponent.block} /> },
  { As: 'li' as const, className: styles.menu_drop_item, href: '#', element: <Element text='Сохранить' icon={EIconsComponent.save} /> },
  { As: 'li' as const, className: styles.menu_drop_item, href: '#', element: <Element text='Пожаловаться' icon={EIconsComponent.warning} /> },
].map(generateId);


export function Menu() {
  
  return (
    <div className={styles.menu}>
      
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <Icon name={EIconsComponent.menu} />
          </button>
        }
        onClose={() => console.log('closed')}
        onOpen={() => console.log('opened')}
      >
        {/* //children: */}
        <ul className={styles.menuDropList}>
          <GenericList list={LIST} />
        </ul>

        <button className={styles.closeBtn}>
          <p>Закрыть</p>
        </button>

      </Dropdown>
    </div >
  );
}
