import { useState, useEffect } from 'react';
import { pixabayApi } from '../API';
import { Box } from './Box';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

const PER_PAGE = 12;

export function App() {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [errSearch, setErrSearch] = useState(false);
	const [query, setQuery] = useState('');
	const [isShowLoadMore, setIsShowLoadMore] = useState(false);
	const [isShowLoader, setIsShowLoader] = useState(false);

	useEffect(() => {
		//! как лучше сделать? fetchData создавать и вызывать внутри useEffect? или выносить отдельно и вызывать в useEffect?
		async function fetchData() {
			try {
				setIsShowLoader(true);
				setIsShowLoadMore(false);

				const getData = await pixabayApi(query, page, PER_PAGE);

				setImages(prevImages => [...prevImages, ...getData.data.hits]);

				checkEmptyArr(getData.data.hits);

				// if (getData.data.total > PER_PAGE) {
				// 	setIsShowLoadMore(true);
				// }

				if (getData.data.total > page * PER_PAGE) {
					setIsShowLoadMore(true);
				}
			} catch (error) {
				console.log(error);
				setErrSearch(true);
			} finally {
				setIsShowLoader(false);
			}
		}

		if (query) {
			fetchData();
		}
	}, [query, page]);

	// метод для получения значений формы из Searchbar
	const handleSubmitForm = searchQuery => {
		setImages([]);
		setQuery(searchQuery);
		setPage(1);
	};

	//метод для проверки массива, пришедшего из сервера, на пустоту
	const checkEmptyArr = data => {
		if (!data.length) {
			setErrSearch(true);
			setIsShowLoadMore(false);
		} else {
			setErrSearch(false);
		}
	};

	// метод для нажатия на кнопку загрузить еще
	const handleLoadMoreBtn = () => {
		setPage(prevPage => prevPage + 1);
	};

	return (
		<Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
			<Searchbar onSubmit={handleSubmitForm}></Searchbar>
			{errSearch && <p>Nothing found for your request. Please try again</p>}
			{images.length > 0 && <ImageGallery images={images} />}
			{isShowLoadMore && <Button onClick={handleLoadMoreBtn} />}
			{isShowLoader && <Loader />}
		</Box>
	);
}
