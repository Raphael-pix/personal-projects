const messageContainer = document.querySelector(".messages-container")
//display only 3 messages in taskbar
for(i=3;i<messageContainer.children.length;i++){
    messageContainer.children.item(i).style.display = "none"
}
function formatTime(timestamp) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(timestamp).toLocaleTimeString(undefined, options);
}

document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messagesContainer');
    const noMessageSpan = document.getElementById('no-message');

    <% if (messages.length > 0) { %>
        noMessageSpan.style.display = 'none';
    <% } else { %>
        messagesContainer.style.display = 'none';
    <% } %>
    
});

document.querySelector('.Cgroup').addEventListener('click',()=>{
    window.location.href = '/createGroupProfile'
})
document.querySelector('.logoutbtn').addEventListener('click',()=>{
    window.location.href = '/logout'
    })