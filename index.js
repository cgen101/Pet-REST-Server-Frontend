
function fetchPets() 
{
    fetch('http://localhost:8000')
        .then(response => response.json())
        .then(pets => {
            const petsList = document.getElementById('pets-list');
            pets.forEach(petName => {
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = petName; 
                button.addEventListener('click', () => {  
                    let editForm = document.getElementById('edit-contain'); 
                    if(editForm)
                    closeEditForm()
                
                    details(petName);
                });
                listItem.appendChild(button); 
                petsList.appendChild(listItem); 
            });
        })
}

function details(petName) 
{ 
    fetch(`http://localhost:8000/${petName}`)
        .then(response => response.json())
        .then(petDeets => { 
            const detailItem = document.getElementById('details-list');
            detailItem.innerHTML = ''; 
            if (petName=="Meowy" || petName=="Barky") { 
                const listItem = document.createElement('li');
                listItem.textContent = `name: ${petName}`;
                detailItem.appendChild(listItem)
            }
            for (const property in petDeets) 
            { 
                const listItem = document.createElement('li');
                listItem.textContent = `${property}: ${petDeets[property]}`;
                detailItem.appendChild(listItem)
            }
            
            const detailsDiv = document.getElementById('details');
            if (detailsDiv)
            {
                detailsDiv.style.display = 'flex';
            }

            document.getElementById('delete').addEventListener('click', () => { 
                adopt(petName);
            });

            document.getElementById('edit-button').addEventListener('click', () => {
                edit(petName);
            });

            document.getElementById('close-detail').addEventListener('click', () => {
                detailsDiv.style.display = 'none'; 
            });
            
        });
}

function adopt(petName)
{ 
    let oldName = petName;
    fetch(`http://localhost:8000/${petName}`,{ method: 'DELETE', 
    })
        .then (window.alert(`Congrats! You have adopted ${oldName}. ${oldName} is now removed from our list of pets.`));
}

function edit(petName)
{ 
    fetch(`http://localhost:8000/${petName}`)
        .then(response => response.json()) 
        .then(petData => {
            const editForm = new createEditForm(petData, petName);
            const editContainer = document.getElementById('edit-contain');
            editContainer.innerHTML = '';
            editContainer.appendChild(editForm);
        })
        .then (showEdit => { 
            document.getElementById('edit-contain').style.display='flex'; 
        });
}

function createEditForm(petData, petName) 
{ 
    const editForm = document.createElement('form');
 
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newData = extractForm(editForm);
        submitEdit(petName, newData);
    });


    for (const property in petData) {
        if (property!="name")
        {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = property;
        input.value = petData[property];
        input.style = 'width: 80px; margin-left: 9px'
        editForm.appendChild(input);
        }
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.style = 'margin-left: 10px'
    editForm.appendChild(submitButton);


    return editForm; 
}

function closeEditForm() { 
    document.getElementById('edit-contain').style.display = 'none'; 
} 

function extractForm(editForm) 
{ 
    const formData = new FormData(editForm);
    const data = {};
    for (const [key, value] of formData.entries()) 
    {
        data[key] = value;
    }
    return data;
}

function submitEdit(petName, newData) 
{ 
    fetch (`http://localhost:8000/${petName}`, { 
        method: 'PUT', 
        body: JSON.stringify(newData), 
    })
    .then(closeEditForm())
    .then (window.alert(`${petName}'s info has been updated.`));
}

function addPet() 
{ 
    const addForm=document.getElementById('add-pet-form'); 
    document.getElementById('add-form').style.display = 'flex';
    addForm.style.display = 'flex';

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newPetData = {};
        formData.forEach((value, key) => {
            newPetData[key] = value;
        });

        submitPet(newPetData);
    });

}

function submitPet(newPetData) 
{ 
    fetch (`http://localhost:8000/${newPetData.name}`, { 
        method: 'POST', 
        body: JSON.stringify(newPetData), 
    })
    .then (window.alert(`Your pet has been added to our list of pets.`));
}






