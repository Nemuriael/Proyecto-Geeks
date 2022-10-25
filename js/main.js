const chatForm = document.querySelector("#chat-form");
const messageContainer = document.querySelector(".chat-messages");
const searchBar = document.querySelector(".search-bar");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msgElement = e.target.elements.msg;
  const today = new Date();
  const msg = {
    username: "Usuario",
    time: `${String(today.getHours()).padStart(2, "0")}:${String(
      today.getMinutes()
    ).padStart(2, "0")}`,
    text: msgElement.value,
  };

  channels[currentChannel].messages.push(msg);
  outputMessages(msg);
  msgElement.value = "";
  msgElement.focus();
});

//Buscador de palabras

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchElement = e.target.elements.search;
  const searchTerm = searchElement.value;
  const searchContainer = document.querySelector("#search-container");
  searchContainer.innerHTML = "";
  channels.forEach((channel, indexChannel) => {
    channel.messages.forEach((msg, indexMessage) => {
      if (msg.text.includes(searchTerm)) {
        let html = "";
        html +=
          '<div class="message" onclick="goToMessage(' +
          indexChannel +
          ", " +
          indexMessage +
          ')">';
        html +=
          '<p class="meta">' +
          msg.username +
          " <span>" +
          msg.time +
          "</span></p>";
        html += '<p class="text">' + msg.text + "</p>";
        html += '<small class="small-text">' + channel.name + "</small>";
        html += "</div>";
        searchContainer.insertAdjacentHTML("beforeend", html);
      }
    });
  });
});

//Click para ir al indice del mensaje

function goToMessage(indexChannel, indexMessage) {
  changeChannel(indexChannel, indexMessage);
}
//Print del mensaje

function outputMessages(msg, currentIndex, index) {
  let html = "";
  html += '<div class="message">';
  html +=
    '<p class="meta">' + msg.username + " <span>" + msg.time + "</span></p>";
  html += '<p class="text">' + msg.text + "</p>";
  html += "</div>";

  //Insert del mensaje en el DOM

  messageContainer.insertAdjacentHTML("beforeend", html);
  if (index === undefined) {
    document.querySelector(".message:last-child").scrollIntoView({
      behavior: "smooth",
    });
  } else if (currentIndex === index) {
    document.querySelector(".message:last-child").scrollIntoView({
      behavior: "smooth",
    });
  }
}

//Canal default en el que se guardaran los mensajes

const channels = [{ name: "General", messages: [] }];
let currentChannel = 0;

//Div de los canales

function printChannel(index) {
  const channel = channels[index];
  const channelContainer = document.querySelector("#channels");
  let html = "";
  html +=
    '<h2 onclick="changeChannel(' + index + ')">' + channel.name + "</h2>";
  channelContainer.insertAdjacentHTML("beforeend", html);
}

//Selector de canal que guarda los mensajes

function changeChannel(indexChannel, indexMessage) {
  const previousChannelElement = document.querySelector(
    "#channels h2:nth-child(" + (currentChannel + 1) + ")"
  );
  previousChannelElement.classList.remove("active");

  const selectedChannelElement = document.querySelector(
    "#channels h2:nth-child(" + (indexChannel + 1) + ")"
  );
  selectedChannelElement.classList.add("active");

  currentChannel = indexChannel;
  messageContainer.innerHTML = "";
  channels[currentChannel].messages.forEach((msg, currentIndex) => {
    outputMessages(msg, currentIndex, indexMessage);
  });
}

//Creador de canales

function createChannel() {
  const channelName = prompt("Introduce el nombre del canal");
  if (channelName) {
    channels.push({ name: channelName, messages: [] });
    printChannel(channels.length - 1);
  }
}

printChannel(currentChannel);
changeChannel(currentChannel);
