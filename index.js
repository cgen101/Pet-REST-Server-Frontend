function fetchPets() 
{
    fetch('http://localhost:8000')
        .then(response => response.json())
        .then(pets => {
            const petsList = document.getElementById('pets-list');
            pets.forEach(petName => {
                const listItem = document.createElement('li');
                const button = document.createElement('button'); // Create a button element
                button.textContent = petName; // Set the button's text content
                button.addEventListener('click', () => {
                    details(petName);
                });
                listItem.appendChild(button); // Append the button to the list item
                petsList.appendChild(listItem); // Append the list item to the list
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
            
        })

        .then(deletePet => {
            document.getElementById('delete').addEventListener('click', () => { 
                adopt(petName);
            });
        });
}

function adopt(petName)
{ 
    let oldName = petName;
    fetch(`http://localhost:8000/${petName}`,{ method: 'DELETE', 
    })
        .then (window.alert(`Congrats! You have adoopted ${oldName}. ${oldName} is now removed from our list of pets.`))
}





