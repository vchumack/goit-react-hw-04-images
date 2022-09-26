import { Component } from 'react';
import { pixabayApi } from '../API';
import { Box } from './Box';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';


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

	async componentDidUpdate(_, prevState) {
		const { page, query } = this.state;

		if (prevState.query !== query) {
			try {
				this.setState({
				isShowLoader: true,
				isShowLoadMore: false,
			});
				const getData = await pixabayApi(query, page, PER_PAGE);
				this.setState({
					images: getData.data.hits,
				});

				this.checkEmptyArr(getData.data.hits);
				// this.setState({ page: 2 });

				if (getData.data.total > PER_PAGE) {
					this.setState({
						isShowLoadMore: true,
					});
				}
			} catch (error) {
				console.log(error);
				this.setState({
					errSearch: true,
				});
			}  finally {
			this.setState({ isShowLoader: false });
		}
		}

		if (prevState.query === query && prevState.page !== page) {
			try {
				
				this.setState({
				isShowLoader: true,
				isShowLoadMore: false,
			});
				const getData = await pixabayApi(query, page, PER_PAGE);

				this.setState(prevState => ({
					images: [...prevState.images, ...getData.data.hits],
				}));

				if (getData.data.total > page * PER_PAGE) {
					this.setState({ isShowLoadMore: true });
				}
			} catch (error) {
				console.log(error);
			} finally {
			this.setState({ isShowLoader: false });
		}
		}
	}

	// метод для получения значений формы из Searchbar
	handleSubmitForm = searchQuery => {
		// записывает в текущий стейт query значение из инпута для кнопки загрузить еще
		this.setState(() => ({
			query: searchQuery,
			page: 1,
		}));
	};

	// метод для нажатия на кнопку загрузить еще
	handleLoadMoreBtn = () => {
		// const { page, query } = this.state;

		this.setState(prevState => ({ page: prevState.page + 1 }));
	};

	

	//метод для проверки массива, пришедшего из сервера, на пустоту
	checkEmptyArr = data => {
		if (!data.length) {
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
