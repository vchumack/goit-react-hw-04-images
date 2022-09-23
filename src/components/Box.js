import styled from 'styled-components';
import {
	typography,
	space,
	color,
	layout,
	border,
	shadow,
	grid,
} from 'styled-system';

export const Box = styled('div')(
	typography,
	space,
	color,
	layout,
	border,
	shadow,
	grid
);
