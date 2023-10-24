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
                    details();
                });
                listItem.appendChild(button); // Append the button to the list item
                petsList.appendChild(listItem); // Append the list item to the list
            });
            })
}

function details() 
{ 



}


