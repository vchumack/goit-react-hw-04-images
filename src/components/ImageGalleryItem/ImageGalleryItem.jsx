import { ImageItem, Image } from './ImageGalleryItem.styled';
import { Component } from 'react';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
	state = {
		isShowModal: false,
	};

	static propTypes = {
		webformatURL: PropTypes.string.isRequired,
		largeImageURL: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
	};

	openModal = () => {
		this.setState({
			isShowModal: true,
		});
	};
	closeModal = () => {
		this.setState({
			isShowModal: false,
		});
	};

	render() {
		const { webformatURL, largeImageURL, alt } = this.props;
		// console.log(this.props);
		return (
			<>
				<ImageItem>
					<Image
						src={webformatURL}
						alt={alt}
						onClick={() => {
							this.openModal();
						}}
					/>
				</ImageItem>
				{this.state.isShowModal && (
					<Modal img={largeImageURL} alt={alt} onClose={this.closeModal} />
				)}
			</>
		);
	}
}

// ImageGalleryItem.propTypes = {};
