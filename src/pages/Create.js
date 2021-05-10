import {
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

export default function Create() {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState("money");
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);

		if (title === "") {
			setTitleError(true);
		}
		if (details === "") {
			setDetailsError(true);
		}

		if (title && details) {
			fetch("http://localhost:8000/notes", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ title, details, category }),
			}).then(() => history.push("/"));
		}
	};

	return (
		<Container>
			<Typography
				variant="h6"
				color="textSecondary"
				component="h2"
				gutterBottom
			>
				Create a New Note
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					label="Note Title"
					variant="outlined"
					color="secondary"
					fullWidth
					required
					onChange={(e) => setTitle(e.target.value)}
					error={titleError}
				/>

				<TextField
					className={classes.field}
					label="Details"
					variant="outlined"
					color="secondary"
					fullWidth
					required
					multiline
					rows={4}
					onChange={(e) => setDetails(e.target.value)}
					error={detailsError}
				/>

				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							control={<Radio />}
							label="Money"
							value="money"
						/>
						<FormControlLabel
							control={<Radio />}
							label="Todos"
							value="todos"
						/>
						<FormControlLabel
							control={<Radio />}
							label="Reminders"
							value="reminders"
						/>
						<FormControlLabel
							control={<Radio />}
							label="Work"
							value="Work"
						/>
					</RadioGroup>
				</FormControl>

				<Button
					// onClick={}
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<KeyboardArrowRight />}
				>
					Submit
				</Button>
			</form>

			<br />
		</Container>
	);
}
