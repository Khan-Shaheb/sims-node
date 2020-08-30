async function studentUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	// console.log(`ID = ${id}`)
	try {
		// get student data by ajax request
		let { data: editModelData } = await axios.get(`/${url}/${id}`);
		// console the data

		// select all input field
		const modalInputs = document.querySelectorAll('.updateInputField');
		// console log all input field
		// console.dir(modalInputs);

		// set input field value
		modalInputs.forEach((input) => {
			input.value = editModelData[input.name];
		});

		async function insertSelectElement(className, route, selectName) {
			// get all class list and insert to edit with selected
			const selectWrap = document.querySelector(className);
			let { data: result } = await axios.get(route);
			// console.log(classes);
			let html = '';
			result.forEach((el) => {
				html += `<option value="${el._id}"${findSelected(el.name, selectName)}>${el.name}</option>`;
			});
			selectWrap.innerHTML = html;
		}
		insertSelectElement('.class-edit-wrap', '/class/get-all-class-list', '_class');
		insertSelectElement('.section-edit-wrap', '/section/get-all-section-list', 'section');
		insertSelectElement('.session-edit-wrap', '/session/get-all-session-list', 'session');
		insertSelectElement('.group-edit-wrap', '/department/get-all-dept-list', 'group');

		function findSelected(value, inputName) {
			if (value == editModelData[inputName].name) return 'selected';
			else return '';
		}
	} catch (err) {
		console.log(err);
	}
}

async function studentDetailsModal(detailsModalBtn, url) {
	const id = detailsModalBtn.dataset.id;
	try {
		// Ajax call
		const { data: result } = await axios.get(`/${url}/${id}`);
		// console.dir(result);

		// convert object to array
		const studentDetails = Object.entries(result);
		console.dir(studentDetails);

		// Selector
		const detailsTable = document.querySelector('.details-table');
		const detailsModalTitle = document.querySelector('.details-modal-title');
		// document.querySelector('.student-details-img').src = result.photo;

		// create data row
		let html = `<tbody>`;
		studentDetails.forEach((row) => {
			if (
				row[0] == '_id' ||
				row[0] == '__v' ||
				row[1] == '' ||
				row[0] == 'createdAt' ||
				row[0] == 'updatedAt' ||
				row[0] == 'photo' ||
				row[1] == null
			) {
				return;
			}

			if (row[0] == '_class' || row[0] == 'section' || row[0] == 'session' || row[0] == 'group') {
				html += `<tr><td>${row[0].charAt(0).toUpperCase() + row[0].slice(1)}</td><td>${row[1].name}</td></tr>`;
				return;
			}

			html += `<tr><td>${row[0].charAt(0).toUpperCase() + row[0].slice(1)}</td><td>${row[1]}</td></tr>`;
		});
		html += `</tbody`;
		// insert data row
		detailsTable.innerHTML = html;
	} catch (error) {
		console.log(error);
	}
}

function studentDeleteModal(deleteModalBtn) {
	const id = deleteModalBtn.dataset.id;
	document.querySelector('.deleteBtn').dataset.id = id;
}

async function deleteSingleItem(deleteBtn, url) {
	const id = deleteBtn.dataset.id;
	try {
		let response = await axios.delete(`/${url}/${id}`);
		console.log(response);
		location.href = response.data.url;
	} catch (err) {
		console.log(err);
	}
}
