import React from 'react';
import { Icon, EIconsComponent } from '../../../../Icon';
import styles from './element.css';

interface IElement {
  text: string;
  icon?: EIconsComponent;
  sizeIcon?: number;
}

export function Element({ text, icon, sizeIcon }: IElement) {
  return (
    <>
      {icon !== undefined && <Icon name={icon} size={sizeIcon} />}
      <span className={styles.element_text}>{text}</span>
    </>
  );
}
