import React from 'react';
import styles from './icon.css';
import { AnonIcon, BlockIcon, CommentsIcon, DownIcon, MenuIcon, ReplyIcon, SaveIcon, ShareIcon, UpIcon, WarningIcon } from '../icons';


export enum EIconsComponent {
  comment,
  share,
  block,
  save,
  warning,
  menu,
  anon,
  reply,
  up,
  down
}

const icons = {
  [EIconsComponent.comment]: <CommentsIcon />,
  [EIconsComponent.share]: <ShareIcon />,
  [EIconsComponent.block]: <BlockIcon />,
  [EIconsComponent.save]: <SaveIcon />,
  [EIconsComponent.warning]: <WarningIcon />,
  [EIconsComponent.menu]: <MenuIcon />,
  [EIconsComponent.anon]: <AnonIcon />,
  [EIconsComponent.reply]: <ReplyIcon />,
  [EIconsComponent.up]: <UpIcon />,
  [EIconsComponent.down]: <DownIcon />,
}

export interface IIconProps {
  name: EIconsComponent;
  size?: number;
}

export function Icon(props: IIconProps) {
  return (
    <div className={styles.icon_container} style={{width: props.size, height: props.size}}>
      {icons[props.name]}
    </div>
  );
}
