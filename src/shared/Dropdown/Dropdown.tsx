import React, { useRef, useState } from 'react';
import styles from './dropdown.css';
import ReactDOM from 'react-dom';

// компонент, включающий только логику выпадения чего угодно из чего угодно

interface IDropdownProps {
  button: React.ReactNode;// btn to open dropdown
  children: React.ReactNode;// list of dropdown menu
  isOpen?: boolean; // property to control list
  onOpen?: () => void; // event when list has been opened 
  onClose?: () => void; // event when list has been closed
}

const NOOP = () => { }; // function to do nothing for default value of onClose and onOpen

export function Dropdown({ button, children, isOpen, onClose = NOOP, onOpen = NOOP }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen); // use hook useState to check Menu is opened or closed (default closed)
  const node = document.querySelector('#dropdown_root'); // DOM container for dropdown list
  const refBtn = useRef<HTMLDivElement>(null); // link to button
  const [coords, setCoords] = React.useState({ top: 0, right: 0 });

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]); // hook to listen changes of properties
  React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]); // activate callbacks
  React.useEffect(() => { // hook to listen window's resize and update button's coordinates
    function changeCoords() {
      if (refBtn) {
        const rectObj = refBtn.current?.getBoundingClientRect();
        setCoords({
          top: Math.round(rectObj ? (rectObj?.bottom + window.scrollY) : 0),
          right: Math.round(rectObj ? (document.body.clientWidth - rectObj?.right) : 0)
        })
      }
    }
    changeCoords();
    window.addEventListener("resize", changeCoords);
    return () => {
      window.removeEventListener("resize", changeCoords);
    }
  }, [refBtn]);

  const handleOpen = () => {  //handle opens list:
    if (isOpen === undefined) {  //if isOpen is not specified, the list will chance property automatically:
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  return (
    <div className={styles.container}>

      <div onClick={handleOpen} ref={refBtn}>
        {button}
      </div>

      {node && isDropdownOpen && ReactDOM.createPortal((
        <div className={styles.listConteiner}
          style={{ top: coords.top + 10, right: coords.right + 5 }}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      ), node)}
    </div>
  );
}
