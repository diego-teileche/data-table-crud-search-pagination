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
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const outsideClick = useRef<any>(false)

	const itemsPerPage = 5
	const lastItem = currentPage * itemsPerPage
	const indexOfFirstItem = lastItem - itemsPerPage

	let filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const filteredData = filteredItems.slice(indexOfFirstItem, lastItem)

	useEffect(() => {
		setCurrentPage(1)
	}, [searchTerm])

	useEffect(() => {
		if (!editId) return

		let selectedId = document.querySelector(
			`[id="${editId}"]`
		) as HTMLElement | null
		selectedId?.focus()
	}, [editId])

	useEffect(() => {
		const handleClickOutside = (e: React.ChangeEvent) => {
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
		if (filteredData.length === 1 && currentPage !== 1)
			setCurrentPage((prev) => prev - 1)

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

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
					value={searchTerm}
					onChange={handleSearch}
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
						{filteredData.map((item) => (
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

				<div className="pagination">
					{Array.from(
						{ length: Math.ceil(filteredItems.length / itemsPerPage) },
						(_, index) => (
							<button
								key={index + 1}
								onClick={() => paginate(index + 1)}
								style={{
									backgroundColor:
										currentPage === index + 1 ? "#04aa6d" : undefined,
									color: currentPage === index + 1 ? "#f0f0f0" : undefined,
								}}
							>
								{index + 1}
							</button>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default DataTable
