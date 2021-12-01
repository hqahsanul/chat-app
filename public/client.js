const socket = io()

let user;


  const textarea = document.querySelector('#textarea')
  const messageArea = document.querySelector('.message__area')

do {
    user = prompt('Please enter your name: ')
} while(!user)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    const msg = {
        user: user,
        message: message.trim()
    }
    // Append 
    appendMessage(msg)

    textarea.value = ''



    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg) {

    const mainDiv = document.createElement('div')
   

    const markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {

    appendMessage(msg)
   
})





