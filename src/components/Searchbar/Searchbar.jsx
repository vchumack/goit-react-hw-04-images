import { useState } from 'react';
import {
	Header,
	SearchForm,
	SearchFormButton,
	SearchFormSpan,
	SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
	const [searchQuery, setSearchQuery] = useState('');

	// метод для получения значения инпута
	const getValueInput = e => {
		setSearchQuery(e.target.value);
	};

	// метод для обработки сабмита
	const handleSubmitForm = e => {
		e.preventDefault();

		onSubmit(searchQuery);
		setSearchQuery('');
	};

	return (
		<Header>
			<SearchForm onSubmit={handleSubmitForm}>
				<SearchFormButton type="submit">
					<SearchFormSpan>Search</SearchFormSpan>
				</SearchFormButton>

				<SearchFormInput
					onChange={getValueInput}
					value={searchQuery}
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
				/>
			</SearchForm>
		</Header>
	);
}

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
