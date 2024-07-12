import { useEffect, useRef, useState } from "react"

interface formDataProps {
	name: string
	gender: string
	age: string
}

interface dataProps {
	id: number
	name: string
	gender: string
	age: string
}

const DataTable = () => {
	const [formData, setFormData] = useState<formDataProps>({
		name: "",
		gender: "",
		age: "",
	})
	const [data, setData] = useState<dataProps[]>([])
	const [editId, setEditId] = useState<number | boolean>(false)
	const outsideClick = useRef(false)

	useEffect(() => {
		if (!editId) return

		let selectedId = document.querySelector(
			`[id="${editId}"]`
		) as HTMLElement | null
		selectedId?.focus()
	}, [editId])

	useEffect(() => {
		const handleClickOutside = (e: React.ChangeEvent) => {
			// @ts-ignore
			if (outsideClick.current && !outsideClick.current.contains(e.target))
				setEditId(false)
		}

		// @ts-ignore
		document.addEventListener("click", handleClickOutside)

		return () => {
			// @ts-ignore
			document.removeEventListener("click", handleClickOutside)
		}
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleAddClick = () => {
		if (formData.name && formData.gender && formData.age) {
			const newItem: dataProps = {
				id: Date.now(),
				name: formData.name,
				gender: formData.gender,
				age: formData.age,
			}

			setData([...data, newItem])
			setFormData({ name: "", gender: "", age: "" })
		}
	}

	const handleDelete = (id: number) => {
		const updatedList = data.filter((item) => item.id !== id)

		setData(updatedList)
	}

	const handleEdit = (id: number, updatedData: Partial<dataProps>) => {
		if (!editId || editId !== id) return

		const updatedList = data.map((item) =>
			item.id === id ? { ...item, ...updatedData } : item
		)
		setData(updatedList)
	}

	return (
		<div className="container">
			<div className="add-container">
				<div className="info-container">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
					/>

					<input
						type="text"
						placeholder="Gender"
						name="gender"
						value={formData.gender}
						onChange={handleInputChange}
					/>

					<input
						type="text"
						placeholder="Age"
						name="age"
						value={formData.age}
						onChange={handleInputChange}
					/>
				</div>

				<button className="add" onClick={handleAddClick}>
					Add
				</button>
			</div>

			<div className="search-table-container">
				<input
					type="text"
					placeholder="Search by Name"
					value={""}
					onChange={() => {}}
					className="search-input"
				/>

				<table // @ts-ignore
					ref={outsideClick}
				>
					<thead>
						<tr>
							<th>Name</th>
							<th>Gender</th>
							<th>Age</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{data.map((item) => (
							<tr key={item.id}>
								<td
									id={item.id.toString()}
									contentEditable={editId === item.id}
									suppressContentEditableWarning={true}
									onBlur={(e) =>
										handleEdit(item.id, { name: e.target.innerText })
									}
								>
									{item.name}
								</td>
								<td
									id={item.id.toString()}
									contentEditable={editId === item.id}
									suppressContentEditableWarning={true}
									onBlur={(e) =>
										handleEdit(item.id, { gender: e.target.innerText })
									}
								>
									{item.gender}
								</td>
								<td
									id={item.id.toString()}
									contentEditable={editId === item.id}
									suppressContentEditableWarning={true}
									onBlur={(e) =>
										handleEdit(item.id, { age: e.target.innerText })
									}
								>
									{item.age}
								</td>
								<td className="actions">
									<button className="edit" onClick={() => setEditId(item.id)}>
										Edit
									</button>
									<button
										className="delete"
										onClick={() => handleDelete(item.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="pagination"></div>
			</div>
		</div>
	)
}

export default DataTable
