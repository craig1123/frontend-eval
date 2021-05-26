/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styles from './modal.module.scss';
/*
Prompt
Create a dismissible modal overlay. 
The UI should initially show a ‘Show offer’ button which, when clicked, displays an overlay resembling the mockup below, including a transparent grey overlay over the background. 
The modal should be vertically and horizontally centered, and always in the same position regardless of scrolling.

https://frontendeval.com/questions/modal-overlay
 */

const Modal = () => {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const acceptOffer = () => {
    setOfferAccepted(true);
    closeModal();
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (modalOpen) {
      window.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [modalOpen]);

  return (
    <div className={styles.wrapper}>
      {modalOpen && (
        <>
          <div className={styles.modalOverlay} onClick={closeModal} />
          <div className={styles.modal}>
            <button type="button" className={styles.closeBtn} onClick={closeModal}>
              X
            </button>
            <p>Click the button below to accept our amazing offer!</p>
            <button type="button" onClick={acceptOffer} className={styles.acceptOffer}>
              Accept Offer
            </button>
          </div>
        </>
      )}
      {offerAccepted ? (
        <h4>Offer Accepted</h4>
      ) : (
        <button type="button" onClick={() => setModalOpen(true)} className={styles.showOffer}>
          Show Offer
        </button>
      )}
    </div>
  );
};

export default Modal;
