const modal = document.querySelector(".modal-container")
const tBody = document.querySelector('tbody')
const date = document.querySelector('#m-date')
const task = document.querySelector('#m-task')
const btnSave = document.querySelector('#btnSave')

let items
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    date.value = items[index].date
    task.value = items[index].task
    id = index
  } else {
    date.value = ''
    task.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  items.splice(index, 1)
  setItems()
  loadItems()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.task}</td>
      <td class="action">
        <button onclick="editItem(${index})"><i class='bx bx-edit'style="color:white"></i></button>
      </td>
      <td class="action">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash' style="color:white"></i></button>
      </td>
    `
    tBody.appendChild(tr)
}

btnSave.onclick = e => {
  
  if (date.value == '' || task.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].date = date.value
    items[id].task = task.value
  } else {
    items.push({'date': date.value, 'task': task.value})
  }

  setItems()

  modal.classList.remove('active')
  loadItems()
  id = undefined
}

  function loadItems() {
    items = getItems()
    tBody.innerHTML = ''
    items.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItems = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItems = () => localStorage.setItem('dbfunc', JSON.stringify(items))

loadItems()