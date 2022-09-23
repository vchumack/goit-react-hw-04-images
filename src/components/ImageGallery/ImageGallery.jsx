import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
	return (
		<ImageGalleryList>
			{images.map(image => (
            <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} alt={image.tags } />
			))}
		</ImageGalleryList>
	);
};


ImageGallery.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			webformatURL: PropTypes.string.isRequired,
			largeImageURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired,
		})
	)
}