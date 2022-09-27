import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { OverlayDiv, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
const htmlRef = document.querySelector('html');

export function Modal({ img, alt, onClose }) {
	useEffect(() => {
		const closeModalEsc = event => {
			if (event.code === 'Escape' || event.code === 'Enter') {
				onClose();
			}
		};

		// при первом монтировании компонента, аналог componentDidMount
		window.addEventListener('keydown', closeModalEsc);
		htmlRef.classList.add('openModal');

		//чистка за собой, снимаем слушателя и класс при размонтировании, аналог componentWillUnmount
		return () => {
			window.removeEventListener('keydown', closeModalEsc);
			htmlRef.classList.remove('openModal');
		};
	}, [onClose]);

	const closeBackdrop = event => {
		if (event.currentTarget === event.target) {
			onClose();
		}
	};

	return createPortal(
		<OverlayDiv onClick={closeBackdrop}>
			<ModalDiv>
				<img src={img} alt={alt} />
			</ModalDiv>
		</OverlayDiv>,
		modalRoot
	);
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	img: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};
