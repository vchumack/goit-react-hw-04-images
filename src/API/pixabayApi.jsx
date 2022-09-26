import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=29564245-0babaf5e9f754f21fa651fdf5';

//метод для отправок запросов на сервер
export const pixabayApi = (searchQuery, page, perPage) => {
	return axios.get(
		`${BASE_URL}${KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
	);
	// console.log(getData.data);
};
