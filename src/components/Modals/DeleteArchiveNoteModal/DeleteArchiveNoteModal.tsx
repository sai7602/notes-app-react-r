import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CancelTwoTone } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { visuallyHiddenSelector } from '../../../store/selectors/visuallyHiddenSelector';
import { visibilityArchiveDelete } from '../../../store/actions/visibilityArchiveDelete';

import styles from './DeleteArchiveNoteModal.module.scss';
import { deleteNoteAction } from '../../../store/actions/deleteNoteAction';
import { archiveNoteAction } from '../../../store/actions/archiveNoteAction';

export default function DeleteArchiveNoteModal() {
	const visuallyHidden = useSelector(visuallyHiddenSelector);
	const mode = useSelector((state: any) => state.modalVisibility.mode);
	const noteIds = useSelector((state: any) => state.modalVisibility.id);
	const dispatch = useDispatch();
	const operationName = () => {
		if (mode === 'Delete Note') {
			return 'deleted';
		}
		if (mode === 'Archive Note') {
			return 'moved to archive';
		}
		if (mode === 'UnArchive Note') {
			return 'moved from archive to active list';
		}
	};
	const handleClose = () => dispatch(visibilityArchiveDelete());
	const handleAddConfirm = () => {
		if (mode === 'Delete Note') {
			dispatch(deleteNoteAction(noteIds));
			handleClose();
		}
		if (mode === 'Archive Note') {
			dispatch(archiveNoteAction(noteIds));
			handleClose();
		}
		if (mode === 'UnArchive Note') {
			dispatch(archiveNoteAction(noteIds));
			handleClose();
		}
	};

	return (
		<div>
			<Modal
				open={visuallyHidden.visibilityArchiveDelete}
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
								variant="h4"
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
						<Typography variant="h4" component="h4">
							Note will be {operationName()}.
						</Typography>

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
