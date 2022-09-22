import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CancelTwoTone } from '@mui/icons-material';
import styles from './AddEditModal.module.scss';
import { Grid, MenuItem, TextField } from '@mui/material';
import categories from '../../data/categoryList';
import { useDispatch, useSelector } from 'react-redux';
import { visuallyHiddenSelector } from '../../store/selectors/visuallyHiddenSelector';
import { visibilityAddEditModal } from '../../store/actions/visibilityAddEditModal';

export default function AddEditModal({ mode }: { mode: string }) {
	const visuallyHidden = useSelector(visuallyHiddenSelector);
	const dispatch = useDispatch();

	const handleClose = () => dispatch(visibilityAddEditModal());
	const [category, setCategory] = useState(categories[0].catName);
	const handleAddConfirm = () => console.log('first');
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value);
	};
	return (
		<div>
			<Modal
				open={visuallyHidden.visibilityAddEditModal}
				sx={{ m: 1 }}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.BoxStyle}>
					<Grid container spacing={2}>
						<Grid item={true} xs={11} justifyContent="center">
							<Typography
								id="modal-modal-title"
								variant="h6"
								// component="h1"
								align="center"
							>
								{mode}
							</Typography>
						</Grid>

						<Grid
							item={true}
							xs={1}
							style={{ paddingLeft: 0, cursor: 'pointer' }}
							color="#1976d2"
							onClick={handleClose}
						>
							<CancelTwoTone />
						</Grid>
					</Grid>

					<Box
						component="form"
						sx={{
							'& > :not(style)': { m: 2, width: '90%' },
						}}
						noValidate
						autoComplete="off"
						display={'flex'}
						flexDirection="column"
						alignItems={'center'}
					>
						<TextField
							id="outlined-basic"
							label="Note Name"
							variant="outlined"
							placeholder="Input Note Name"
						/>
						<TextField
							id="outlined-textarea"
							label="Content"
							placeholder="Input Note Content"
							multiline
						/>
						<TextField
							id="outlined-select-currency"
							select
							label="Select"
							value={category}
							onChange={handleChange}
							helperText="Please Select Category"
						>
							{categories.map((option) => (
								<MenuItem
									key={option.catId}
									value={option.catName}
								>
									{option.catName}
								</MenuItem>
							))}
						</TextField>

						<Grid
							container
							justifyContent={'center'}
							spacing={2}
							m={0}
						>
							<Grid item={true} xs={4}>
								<Button
									onClick={handleClose}
									variant="contained"
								>
									Cancel
								</Button>
							</Grid>
							<Grid item={true} xs={4}>
								<Button
									onClick={handleAddConfirm}
									variant="contained"
								>
									Confirm
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
