const DataTable = () => {
	return (
		<div className="container">
			<div className="add-container">
				<div className="info-container">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={""}
						onChange={() => {}}
					/>

					<input
						type="text"
						placeholder="Gender"
						name="gender"
						value={""}
						onChange={() => {}}
					/>

					<input
						type="text"
						placeholder="Age"
						name="age"
						value={""}
						onChange={() => {}}
					/>
				</div>

				<button className="add">Add</button>
			</div>

			<div className="search-table-container">
				<input
					type="text"
					placeholder="Search by Name"
					value={""}
					onChange={() => {}}
					className="search-input"
				/>

				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Gender</th>
							<th>Age</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody></tbody>
				</table>

				<div className="pagination"></div>
			</div>
		</div>
	)
}

export default DataTable
