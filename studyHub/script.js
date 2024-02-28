const messageContainer = document.querySelector(".messages-container")
//display only 3 messages in taskbar
for(i=3;i<messageContainer.children.length;i++){
    messageContainer.children.item(i).style.display = "none"
}