import { useState } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ webformatURL, largeImageURL, alt }) {
	
	const [isShowModal, setIsShowModal] = useState(false)
	
		return (
			<>
				<ImageItem>
					<Image
						src={webformatURL}
						alt={alt}
						onClick={() => {
							setIsShowModal(true)
						}}
					/>
				</ImageItem>
				{isShowModal && (
					<Modal img={largeImageURL} alt={alt} onClose={() => {setIsShowModal(false)}} />
				)}
			</>
		);
	}


ImageGalleryItem.propTypes =  {
		webformatURL: PropTypes.string.isRequired,
		largeImageURL: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
	};

