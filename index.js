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
            for (const property in petDeets) 
            { 
                const listItem = document.createElement('li');
                listItem.textContent = `${property}: ${petDeets[property]}`;
                detailItem.appendChild(listItem)
            }

            const detailsDiv = document.getElementById('details');
            if (detailsDiv)
            {
            detailsDiv.style.display = 'block';
            }

            document.getElementById('delete').addEventListener('click', () => { 
                adopt(petName);
            });

            document.getElementById('edit-button').addEventListener('click', () => { 
                edit(petName);
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
            const editForm = createEditForm(petData, petName);

            const editContainer = document.getElementById('edit-contain');
            editContainer.innerHTML = '';
            editContainer.appendChild(editForm);
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
        const input = document.createElement('input');
        input.type = 'text';
        input.name = property;
        input.value = petData[property];
        editForm.appendChild(input);
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    editForm.appendChild(submitButton);

    return editForm; 
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
    .then (window.alert(`${petName}'s info has been updated.`));
}

function addPet() 
{ 
    document.getElementById('add-pet-form').addEventListener('submit', (event) => {
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






