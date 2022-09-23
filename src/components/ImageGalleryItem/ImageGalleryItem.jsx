import { ImageItem, Image } from './ImageGalleryItem.styled';
import { Component } from 'react';
import { Modal } from '../Modal';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
	state = {
		isShowModal: false,
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
		const { webformatURL, largeImageURL, tags } = this.props;
		return (
			<>
				<ImageItem>
					<Image
						src={webformatURL}
						alt={tags}
						onClick={() => {
							this.openModal();
						}}
					/>
				</ImageItem>
				{this.state.isShowModal && (
					<Modal img={largeImageURL} alt={tags} onClose={this.closeModal} />
				)}
			</>

			
		);































		
	}
}

// ImageGalleryItem.propTypes = {};
