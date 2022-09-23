import { Component } from 'react';
import {
	Header,
	SearchForm,
	SearchFormButton,
	SearchFormSpan,
	SearchFormInput,
} from './Searchbar.styled';
// import PropTypes from 'prop-types';

export class Searchbar extends Component {
	state = {
		searchQuery: '',
	};

	// метод для получения значения инпута
	getValueInput = e => {
		this.setState({ searchQuery: e.target.value });
		// console.log(this.state.searchQuery);
	};
	// метод для обработки сабмита
	handleSubmitForm = e => {
		e.preventDefault();
      this.props.onSubmit(this.state.searchQuery);
      this.reset();
	};

	reset = () => {
      this.setState({
         searchQuery: ''
      });
	};

	render() {
		return (
			<Header>
				<SearchForm onSubmit={this.handleSubmitForm}>
					<SearchFormButton type="submit">
						<SearchFormSpan>Search</SearchFormSpan>
					</SearchFormButton>

					<SearchFormInput
						onChange={this.getValueInput}
						value={this.state.searchQuery}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</SearchForm>
			</Header>
		);
	}
}
