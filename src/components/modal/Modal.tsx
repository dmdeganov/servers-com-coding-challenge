import React, {ReactNode, useEffect, useRef} from 'react';
import ReactPortal from '@/components/modal/ReactPortal';
import {CSSTransition} from 'react-transition-group';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  preventClosing?: boolean;
  className?: string;
}

export default function Modal({isOpen, close, preventClosing, className, children}: ModalType) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' && !preventClosing ? close() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [close, preventClosing]);

  function onLayoutClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === nodeRef.current && !preventClosing) close();
  }

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition in={isOpen} timeout={{enter: 0, exit: 300}} appear={true} unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div className={`modal${className ? ` ${className}` : ''}`} ref={nodeRef} onClick={onLayoutClickHandler} role="presentation">
          <div className="modal__content">{children}</div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
