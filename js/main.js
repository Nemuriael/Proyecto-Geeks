const chatForm = document.getElementById('chat-form');
const messageContainer = document.querySelector('.chat-messages');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msgElement = e.target.elements.msg;
    const today = new Date();
    const msg = {
        username: 'Usuario',
        time: `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`,
        text: msgElement.value
    };

    channels[currentChannel].messages.push(msg)
    outputMessages(msg);
    msgElement.value = '';
    msgElement.focus();
});


function outputMessages(msg) {


    //Div del mensaje

    let html = '';
    html += '<div class="message">';
    html += '<p class="meta">' + msg.username + ' <span>' + msg.time + '</span></p>';
    html += '<p class="text">' + msg.text + '</p>';
    html += '</div>';

    //Insert del mensaje en el DOM

    messageContainer.insertAdjacentHTML('beforeend', html);

    document.querySelector('.message:last-child').scrollIntoView({
        behavior: 'smooth'
    });

};

    //Canal default en el que se guardaran los mensajes

const channels = [{name:'General', messages:[]}];
let currentChannel = 0;

    //Div de los canales

function printChannel(index) {
    const channel = channels[index]
    const channelContainer = document.querySelector('#channels')
    let html = '';
    html += '<h2 onclick="changeChannel('+ index +')">' + channel.name + '</h2>'
    channelContainer.insertAdjacentHTML('beforeend', html)
};
    //Selector de canal que guarda los mensajes

function changeChannel(index) {
    const previousChannelElement = document.querySelector('#channels h2:nth-child('+(currentChannel+1)+')')
    previousChannelElement.classList.remove('active')

    const selectedChannelElement = document.querySelector('#channels h2:nth-child('+(index+1)+')')
    selectedChannelElement.classList.add('active')

    currentChannel = index
    messageContainer.innerHTML= ''
    channels[currentChannel].messages.forEach((msg)=>{
    outputMessages(msg)
})
};

function createChannel() {
const channelName = prompt('Introduce el nombre del canal, amore')
if (channelName) {
    channels.push({name:channelName, messages:[]})
    printChannel(channels.length-1)
}
};

printChannel(currentChannel);
changeChannel(currentChannel);