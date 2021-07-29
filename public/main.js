const socket = io('http://localhost:4000')

const clientTotal = document.querySelector('.client')
const messageContainer = document.querySelector('#message-container')
const nameInput = document.querySelector("#name-input")
const form = document.querySelector('#message-form')
const input = document.querySelector('#message-input')
const message = document.querySelector('#message')

const messageTone = new Audio('/messaging.mp3')


form.onsubmit = (e) =>{
    e.preventDefault()
    console.log(input.value)
    if (input.value === '') return
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
    messageTone.play()
    console.log(data)
      addMessage(false, data)
})

socket.on('client-Total', (data) => {
    console.log(data)
    clientTotal.innerHTML=`Total Clients: ${data}`
})



const addMessage = (ownMessage, data) => {
    clearFeedback()
   const element = `
        <li class='${ownMessage ? 'message-right' : 'message-left'}'>
        <p class="message">
           ${data.message}
            <span>${data.name} ${data.date}</span>
        </p>
        </li>
    `
  messageContainer.innerHTML+=element
  scollBottom()
}

const scollBottom = () => {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

input.onfocus = () => {
    socket.emit('feedback' , {feedback: `${nameInput.value} is typing a message ....`})
}

input.onkeypress = () => {
    socket.emit('feedback' , {feedback: `${nameInput.value} is typing a message ....`}) 
}
input.onblur = () => {
    socket.emit('feedback' , {feedback: ''}) 
}

socket.on('feedback' ,(data) => {
    clearFeedback()
  const element=`
    <li class="message-feedback">
        <p class="feedback" id="feedback">
        ${data.feedback}
        </p>
    </li>
`  
messageContainer.innerHTML+=element

}) 


// to clear all feedback elements
// select all the li tags of message feedback

const  clearFeedback = () => {
    document.querySelectorAll('li.message-feedback').forEach(element => {
        console.log(element) 
       element.parentNode.removeChild(element)
    })
}

