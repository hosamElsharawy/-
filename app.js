
let people = [];
let dailyAmount = 10;

function addPerson() {
    const name = prompt("Enter person's name:");
    if (name) {
        const person = {
            name: name,
            balance: 0,
            days: [0, 0, 0, 0, 0, 0, 0],
        };
        people.push(person);
        saveData();
        render();
    }
}

function deletePerson(index) {
    people.splice(index, 1);
    saveData();
    render();
}

function render() {
    const peopleList = document.getElementById('peopleList');
    peopleList.innerHTML = '';
    people.forEach((person, index) => {
        let total = person.days.reduce((sum, day) => sum + day, 0);
        total += person.balance;
        const personRow = `
            <tr>
                <td>${person.name}</td>
                <td>${person.balance} SAR</td>
                ${person.days.map(day => `<td>${day} SAR</td>`).join('')}
                <td>${total} SAR</td>
                <td><button onclick="deletePerson(${index})">Delete</button></td>
            </tr>
        `;
        peopleList.innerHTML += personRow;
    });
}

function saveData() {
    localStorage.setItem('people', JSON.stringify(people));
}

function loadData() {
    const data = localStorage.getItem('people');
    if (data) {
        people = JSON.parse(data);
        render();
    }
}

function saveDailyAmount() {
    dailyAmount = document.getElementById('dailyAmount').value;
    localStorage.setItem('dailyAmount', dailyAmount);
}

function addDailyAmount() {
    people.forEach(person => {
        person.balance += parseFloat(dailyAmount);
    });
    saveData();
    render();
}

window.onload = function() {
    loadData();
    setInterval(addDailyAmount, 24 * 60 * 60 * 1000); // Add daily amount every 24 hours
};
