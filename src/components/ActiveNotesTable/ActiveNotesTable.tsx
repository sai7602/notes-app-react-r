import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	TableContainer,
	Paper,
	Box,
	Button,
} from '@mui/material';

import {
	DeleteTwoTone,
	ArchiveTwoTone,
	EditTwoTone,
} from '@mui/icons-material';

import { Data, Order } from '../../types';
import categoryIcon from '../../utils/categoryIcon';
import getComparator from '../../utils/getComparator';
import stableSort from '../../utils/stableSort';
import ActiveNotesTableHead from './ActiveNotesTableHead';
import TableTitle from '../TableTitle';
import AddEditModal from '../AddEditModal/AddEditModal';
import { activeNoteSelector } from '../../store/selectors/activeNoteSelector';
import { archiveNoteAction } from '../../store/actions/archiveNoteAction';
import { deleteNoteAction } from '../../store/actions/deleteNoteAction';

import '../ActiveNotesTable.scss';
import { visibilityAddEditModal } from '../../store/actions/visibilityAddEditModal';

function ActiveNotesTable() {
	const initialData = useSelector(activeNoteSelector);

	const handleOpen = () => dispatch(visibilityAddEditModal());
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof Data>('name');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const dispatch = useDispatch();

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleArchive = (id: string) => {
		dispatch(archiveNoteAction(id));
	};
	const handleEdit = (e: any) => {
		handleOpen();
		console.log(e);
	};
	const handleDelete = (id: string) => {
		console.log(id);
		dispatch(deleteNoteAction(id));
	};
	return (
		<Box sx={{ width: '100%', padding: '20px' }}>
			<Paper elevation={0} sx={{ width: '100%', mb: 3, p: 3 }}>
				<TableTitle title={'Active list'} />
				<TableContainer>
					<Table
						className="table"
						sx={{ minWidth: 750, p: 3, m: 3 }}
						aria-labelledby="tableTitle"
					>
						<ActiveNotesTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={initialData.length}
						/>
						<TableBody sx={{ width: '100%', mb: 3, p: 3 }}>
							{stableSort(
								initialData,
								getComparator(order, orderBy)
							)
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											tabIndex={-1}
											key={row.id}
										>
											<TableCell>
												{categoryIcon(row.icon)}
											</TableCell>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
											>
												{row.name}
											</TableCell>
											<TableCell align="left">
												{row.createDate}
											</TableCell>
											<TableCell align="left">
												{row.category}
											</TableCell>
											<TableCell align="left">
												{row.content}
											</TableCell>
											<TableCell align="left">
												{row.modificationDate}
											</TableCell>
											<TableCell
												onClick={handleEdit}
												align="right"
											>
												<EditTwoTone />
											</TableCell>
											<TableCell
												onClick={() =>
													handleArchive(row.id)
												}
												align="right"
											>
												<ArchiveTwoTone />
											</TableCell>
											<TableCell
												onClick={() =>
													handleDelete(row.id)
												}
												align="right"
											>
												<DeleteTwoTone />
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={initialData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				<Box justifyContent={'center'} display={'flex'}>
					<Button onClick={handleOpen} variant="contained">
						Add Note
					</Button>
					<AddEditModal mode="Add Note" />
				</Box>
			</Paper>
		</Box>
	);
}

export default ActiveNotesTable;