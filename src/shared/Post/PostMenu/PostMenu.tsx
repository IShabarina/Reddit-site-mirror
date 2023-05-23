import React, { MouseEventHandler, useState } from 'react';
import styles from './postmenu.css';
import { GenericList } from '../../../GenericList';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { EIconsComponent } from '../../Icon';
import { Element } from '../../CardsList/Card/Menu/Element';
import { CommentFormUncontrol } from '../CommentFormUncontrol';

interface IPostMenuProp {
  userName: string
}

export function PostMenu(props: IPostMenuProp) {

  const menuList = [
    { As: 'button' as const, onClick: () => handleReplyClick(), className: styles.menu_item, href: '#', element: <Element text='Ответить' icon={EIconsComponent.block} /> },
    { As: 'button' as const, className: styles.menu_item, href: '#', element: <Element text='Поделиться' icon={EIconsComponent.share} /> },
    { As: 'button' as const, className: styles.menu_item, href: '#', element: <Element text='Пожаловаться' icon={EIconsComponent.warning} /> },
  ].map(generateId);

  const [commentFormIsOppened, setCommentFormIsOppened] = useState(false);

  const handleMenuClick: MouseEventHandler<HTMLUListElement> = (event) => {
    event.stopPropagation();
  }

  function handleReplyClick() {
    setCommentFormIsOppened(!commentFormIsOppened);
  }

  return (
    <>
      <ul className={styles.menu} onClick={handleMenuClick}>
        <GenericList list={menuList} />
      </ul>
      {commentFormIsOppened &&
        <CommentFormUncontrol name={props.userName} />
      }
    </>
  );
}


