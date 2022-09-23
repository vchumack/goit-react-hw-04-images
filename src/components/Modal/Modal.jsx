// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayDiv, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
const htmlRef = document.querySelector('html');

export class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.closeModalEsc);
		htmlRef.classList.add('openModal');
	}

	//чистка за собой, снимаем слушателя и класс
	componentWillUnmount() {
		window.removeEventListener('keydown', this.closeModalEsc);
		htmlRef.classList.remove('openModal');
	}

	closeModalEsc = (event) => {
		if (event.code === 'Escape' || event.code === 'Enter') {
			this.props.onClose();
		}
	};


	closeBackdrop = (event) => {
		if (event.currentTarget === event.target) {
			this.props.onClose();
		}
	}
	render() {
		const { img, alt } = this.props;
		return createPortal(
			<OverlayDiv onClick={this.closeBackdrop}>
				<ModalDiv >
					<img src={img} alt={alt} />
				</ModalDiv>
			</OverlayDiv>,
			modalRoot
		);
	}
}
