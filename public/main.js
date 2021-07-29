const socket = io('http://localhost:4000')

const clientTotal = document.querySelector('.client')
const messageContainer = document.querySelector('#message-container')
const nameInput = document.querySelector("#name-input")
const form = document.querySelector('#message-form')
const input = document.querySelector('#message-input')
const message = document.querySelector('#message')



form.onsubmit = (e) =>{
    e.preventDefault()
    console.log(input.value)
    const data = {
        name: nameInput.value,
        message:  input.value,
        date: new Date().toString()
    }

    socket.emit('sendmessage', data)
    addMessage(true, data)
    input.value =""
}

socket.on('messagereceive', (data) => {
    console.log(data)
      addMessage(false, data)
})

socket.on('client-Total', (data) => {
    console.log(data)
    clientTotal.innerHTML=`Total Clients: ${data}`
})



const addMessage = (ownMessage, data) => {
   const element = `
        <li class='${ownMessage ? 'message-right' : 'message-left'}'>
        <p class="message">
           ${data.message}
            <span>${data.name} ${data.date}</span>
        </p>
        </li>
    `
  messageContainer.innerHTML+=element
}

const scollBottom = () => {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}