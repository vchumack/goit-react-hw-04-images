import { Component } from 'react';
import { Box } from './Box';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=29564245-0babaf5e9f754f21fa651fdf5';
const PER_PAGE = 12;

export class App extends Component {
	state = {
		images: [],
		page: 1,
		errSearch: false,
		query: '',
		isShowLoadMore: false,
		isShowLoader: false,
	};

	// метод для получения значений формы из Searchbar
	handleSubmitForm = async searchQuery => {
		const { page } = this.state;

		// записывает в текущий стейт query значение из инпута для кнопки загрузить еще
		this.setState({
			query: searchQuery,
		});

		try {
			const getData = await this.getPixabayApi(searchQuery, page);
			this.setState({ images: getData.hits });

			this.checkEmptyArr(getData);
			this.setState({ page: 2 });

			if (getData.total > PER_PAGE) {
				this.setState({
					isShowLoadMore: true,
				});
			}
		} catch (error) {
			console.log(error);
			this.setState({
				errSearch: true,
			});
		}
	};

	// метод для нажатия на кнопку загрузить еще
	handleLoadMoreBtn = async () => {
		const { page, query } = this.state;

		try {
			const getImg = await this.getPixabayApi(query, page);

			this.setState(prevState => ({
				images: [...prevState.images, ...getImg.hits],
			}));

			if (getImg.total > this.state.page * PER_PAGE) {
				this.setState({ isShowLoadMore: true });
			}

			this.setState(prevState => ({ page: prevState.page + 1 }));
		} catch (error) {
			console.log(error);
		}
	};

	//метод для отправок запросов на сервер
	getPixabayApi = async (searchQuery, page) => {
		try {
			this.setState({ isShowLoader: true, isShowLoadMore: false });
			const getData = await axios.get(
				`${BASE_URL}${KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal`
			);
			// console.log(getData.data);
			return getData.data;
		} catch (error) {
			console.log(error);
		} finally {
			this.setState({ isShowLoader: false });
		}
	};

	//метод для проверки массива, пришедшего из сервера, на пустоту
	checkEmptyArr = data => {
		if (data.hits.length < 1) {
			this.setState({
				errSearch: true,
				isShowLoadMore: false,
			});
		} else {
			this.setState({
				errSearch: false,
			});
		}
	};

	render() {
		const { images, errSearch, isShowLoadMore, isShowLoader } = this.state;
		return (
			<Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
				<Searchbar onSubmit={this.handleSubmitForm}></Searchbar>
				{errSearch && <p>Nothing found for your request. Please try again</p>}
				{images.length > 0 && <ImageGallery images={images} />}
				{isShowLoadMore && <Button onClick={this.handleLoadMoreBtn} />}
				{isShowLoader && <Loader />}
			</Box>
		);
	}
}
