// student module
async function studentUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	let editModelData = await getUpdateDetailAndInsert(id, url);
	insertSelectElement(
		editModelData,
		'.class-edit-wrap',
		'/class/get-all-class-list',
		'class'
	);
	insertSelectElement(
		editModelData,
		'.section-edit-wrap',
		'/section/get-all-section-list',
		'section'
	);
	insertSelectElement(
		editModelData,
		'.session-edit-wrap',
		'/session/get-all-session-list',
		'session'
	);
	insertSelectElement(
		editModelData,
		'.dept-edit-wrap',
		'/department/get-all-dept-list',
		'dept'
	);
}

async function studentDetailsModal(detailsModalBtn, url) {
	const id = detailsModalBtn.dataset.id;
	getDetailsModalInfo(
		url,
		id,
		'.details-modal-table',
		'.details-modal-title',
		'.details-modal-img'
	);
}

// Teacher module
function teacherDetailsModal(detailsModalBtn, url) {
	const id = detailsModalBtn.dataset.id;
	getDetailsModalInfo(
		url,
		id,
		'.details-modal-table',
		'.details-modal-title',
		'.details-modal-img'
	);
}

async function teacherUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	let editModelData = await getUpdateDetailAndInsert(id, url);
	insertSelectElement(
		editModelData,
		'.dept-edit-wrap',
		'/department/get-all-dept-list',
		'dept'
	);
}

// admin module

function adminDetailsModal(detailsModalBtn, url) {
	const id = detailsModalBtn.dataset.id;
	getDetailsModalInfo(
		url,
		id,
		'.details-modal-table',
		'.details-modal-title',
		'.details-modal-img'
	);
}

async function adminUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	await getUpdateDetailAndInsert(id, url);
}

// class module
async function classUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	let editModelData = await getUpdateDetailAndInsert(id, url);
	await insertCheckBoxElement(
		editModelData,
		'.section-checkbox-edit-wrap',
		'/section/get-all-section-list'
	);
}

// Reuse function
async function insertCheckBoxElement(editModelData, checkboxWrapClass, route) {
	let { data: checkboxLists } = await axios.get(route);
	// console.log(checkboxLists);
	let html = '';
	checkboxLists.forEach((checkbox, index) => {
		html += `<div class="form-check d-inline section-checkbox"><input class="form-check-input" type="checkbox" ${checked(
			editModelData,
			checkbox.section_name
		)}
                name="sections" id="section${index}" value="${checkbox._id}">
                <label class="form-check-label">${
					checkbox.section_name
				}</label></div>`;
	});

	document.querySelector(checkboxWrapClass).innerHTML = html;
}

async function showUpdateModal(updateModalBtn, url) {
	const id = updateModalBtn.dataset.id;
	await getUpdateDetailAndInsert(id, url);
}

async function getUpdateDetailAndInsert(id, url) {
	try {
		// get all data by ajax request
		let { data: editModelData } = await axios.get(`/${url}/${id}`);

		// select all input field
		const modalInputs = document.querySelectorAll('.updateInputField');
		// console.dir(modalInputs);

		// set input field value
		modalInputs.forEach((input) => {
			input.value = editModelData[input.name];
		});
		return editModelData;
	} catch (e) {
		console.error(e);
	}
}
async function insertSelectElement(
	editModelData,
	selectWrapClass,
	route,
	selectName
) {
	// get all dept list and insert to edit with selected
	const selectWrap = document.querySelector(selectWrapClass);
	console.log(selectWrap);

	try {
		let { data: result } = await axios.get(route);
		console.log(result);
		let html = '';
		result.forEach((el) => {
			html += `<option value="${el._id}"${findSelected(
				editModelData,
				el[selectName + '_name'],
				selectName
			)}>${el[selectName + '_name']}</option>`;
		});
		selectWrap.innerHTML = html;
	} catch (e) {
		console.error(e);
	}
}

function deleteModalHandler(deleteModalBtn) {
	const id = deleteModalBtn.dataset.id;
	document.querySelector('.deleteBtn').dataset.id = id;
}

async function deleteItemHandler(deleteBtn, url) {
	const id = deleteBtn.dataset.id;
	try {
		let response = await axios.delete(`/${url}/${id}`);
		location.href = response.data.url;
	} catch (e) {
		console.error(e);
	}
}

async function getDetailsModalInfo(
	url,
	id,
	detailsTableClass,
	detailsModalTitleClass,
	detailsModalImgClass
) {
	try {
		// Ajax call
		let { data: detailsModalData } = await axios.get(`/${url}/${id}`);
		console.dir(detailsModalData);

		// convert object to array
		const teacherDetails = Object.entries(detailsModalData);
		// console.dir(teacherDetails);

		// Selector
		const detailsTable = document.querySelector(detailsTableClass);
		const detailsModalTitle = document.querySelector(
			detailsModalTitleClass
		);
		document.querySelector(detailsModalImgClass).src =
			detailsModalData.photo;

		// create data row§
		let html = `<tbody>`;
		teacherDetails.forEach((row) => {
			if (
				row[0] == '_id' ||
				row[0] == '__v' ||
				row[1] == '' ||
				row[0] == 'createdAt' ||
				row[0] == 'updatedAt' ||
				row[0] == 'photo' ||
				row[1] == null
			)
				return;
			if (
				row[0] == 'dept' ||
				row[0] == 'section' ||
				row[0] == 'session'
			) {
				html += `<tr><td>${formatText(row[0])}</td><td>${
					row[1][row[0] + '_name']
				}</td></tr>`;
				return;
			}
			if (row[0] == '_class') {
				html += `<tr><td>${formatText(row[0])}</td><td>${
					row[1].class_name
				}</td></tr>`;
				return;
			}
			if (row[0] == 'full_name' || row[0] == 'student_first_name') {
				detailsModalTitle.innerHTML = `${row[1]} Profile`;
			}

			html += `<tr><td>${formatText(row[0])}</td><td>${row[1]}</td></tr>`;
		});
		html += `</tbody`;

		// insert data row
		detailsTable.innerHTML = html;
	} catch (e) {
		console.error(e);
	}
}
// helper function or  formate function start

function formatText(text) {
	text = text.replace('_', ' ').replace('_', ' ');
	return text.charAt(0).toUpperCase() + text.slice(1);
}
function checked(editModelData, name) {
	const sectionsArray = editModelData.sections.map(
		(section) => section.section_name
	);
	if (sectionsArray.includes(name)) {
		return 'checked';
	} else {
		return '';
	}
}
function findSelected(editModelData, value, inputName) {
	if (inputName == 'class') inputName = '_' + inputName;
	if (value == editModelData[inputName][inputName + '_name'])
		return 'selected';
	else return '';
}

document.querySelector('.logout').addEventListener('click', async (e) => {
	window.location.href = '/login';
});
