const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
  
];

function addMessage({ sender, text }) {
  // Fill in!
  message = { sender, text };
  messages.push(message);
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

