
  document.getElementById('editProfilePhotoBtn').addEventListener('click', function (e) {
    e.preventDefault()
    document.getElementById('profilePictureInput').click();
  });

  document.getElementById('profilePictureInput').addEventListener('change', function () {
    const fileInput = this;
    const previewImg = document.querySelector('.profile-pic img');

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImg.src = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  });
  document.querySelector(".addmember").addEventListener("click",()=>{
    document.getElementById("searchMemb").classList.toggle("visible")
  })

  document.getElementById("members").addEventListener("click", (e) => {
    if (e.target.classList.contains("searchUserbtn")) {
        e.preventDefault();
        searchMembers();
    }
});

  function searchMembers() {
    const searchInput = document.getElementById('searchUser').value.toLowerCase();
    const membersList = document.getElementById('membersList');

    if(!searchInput){
      console.log("no input detected")
      return
    }

    fetch(`/api/searchMembers?query=${searchInput}`)
        .then(response => response.json())
        .then(data => {

            data.forEach(member => {
              console.log(member)
                const listItem = document.createElement('li');
                listItem.textContent =  member.name;
                // listItem.addEventListener('click', () => addMemberToGroup(member.id));
                membersList.appendChild(listItem);

                listItem.addEventListener("click",()=>{
                  listItem.remove()
                })
            });
        })
        .catch(error => {
            console.error('Error fetching members:', error);
        });
  }

function addMemberToGroup(memberId) {

    const apiUrl = '/api/addMemberToGroup';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId: memberId }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add member to the group');
        }
        return response.json();
    })
    .then(data => {
        console.log('Member added to the group with ID:', memberId);
    })
    .catch(error => {
        console.error('Error adding member to the group:', error);
    });
}

const interestLabels = document.querySelectorAll('.input-bar label');
interestLabels.forEach((label) => {
    label.addEventListener('click', function (event) {
        event.preventDefault();

        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;

        if (checkbox.checked) {
            label.classList.add("checked");
        } else {
            label.classList.remove("checked");
        }
        updateInterestsArray()
    });
});
function updateInterestsArray() {
  const selectedInterests = Array.from(interestLabels)
      .filter((label) => label.querySelector('input[type="checkbox"]').checked)
      .map((label) => label.querySelector('input[type="checkbox"]').value);
  document.getElementById('selectedInterests').value = JSON.stringify(selectedInterests);
}

function updateMembersAndRulesArray() {

  const selectedMembers = Array.from(document.querySelectorAll('.membersList li'))
    .map((member) => member.textContent.trim());
  document.getElementById('selectedMembers').value = JSON.stringify(selectedMembers);

  const selectedRules = Array.from(document.querySelectorAll('.rulesList li'))
    .map((rule) => rule.textContent.trim());
  document.getElementById('selectedRules').value = JSON.stringify(selectedRules);
}

document.querySelector(".addrulebtn").addEventListener("click",(e)=>{
  e.preventDefault()
  addrule()
})

function addrule() {
  const ruleInput = document.getElementById('addRule').value;
  console.log(ruleInput)
  const ruleList = document.getElementById('rulesList');
  console.log(ruleList)
  if(!ruleInput){
    console.log("no input detected")
    return
  }else{
    const listItem = document.createElement('li');
    listItem.textContent =  ruleInput;
    ruleList.appendChild(listItem);

    addRuleTextarea.value = '';

    listItem.addEventListener("click",()=>{
      listItem.remove()
    })
  }
}