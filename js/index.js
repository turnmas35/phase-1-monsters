document.addEventListener('DOMContentLoaded', function() {
    fetchMonsters();
    createMonsterForm();
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadPrevMonsters()
    })
    forwardButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadMoreMonsters()
    })
});

function fetchMonsters(monster) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=?`)
      .then(res => res.json())
      .then(jsonMonsters => {
        jsonMonsters.forEach(monster => {
        createMonsters(monster)
      })
    })
    };

function createMonsters(monster) {
    const monsterContainer = document.getElementById('monster-container');
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const div = document.createElement('div')
    h2.innerText = monster.name
    h4.innerText = `Age: ${monster.age}`
    p.innerText = `Bio: ${monster.description}`;
    monsterContainer.append(div)
    div.append(h2, h4, p)
      
    // console.log(monster)
}

function createMonsterForm() {
    const createMonsterDiv = document.getElementById('create-monster');
    const monsterForm = document.createElement("form");
    monsterForm.id = 'monster-form';
    createMonsterDiv.append(monsterForm)
    const input1 = document.createElement("input");
    input1.id = "name"
    input1.placeholder = "name..."
    monsterForm.append(input1)
    const input2 = document.createElement("input");
    input2.id = "age"
    input2.placeholder = "age..."
    monsterForm.append(input2)
    const input3 = document.createElement("input");
    input3.id = "description"
    input3.placeholder = "description..."
    monsterForm.append(input3)
    const createButton = document.createElement("button");
    createButton.innerText = "Create"
    monsterForm.append(createButton)

    createButton.addEventListener('click', (e) => {
        e.preventDefault();
        newMonster(monsterForm.children[0].value, monsterForm.children[1].value, monsterForm.children[2].value)
        monsterForm.reset();
    })
}

function newMonster(name, age, description) {
    const monsterInfo = {
        name: name,
        age: age,
        description: description,
    };
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monsterInfo)
    })
    .then(res => res.json())
    .then(monster => {
        createMonsters(monster)
    })
}

function loadPrevMonsters() {
    const monsterContainer = document.getElementById('monster-container');
    console.log(currentPage)
    if (currentPage > 1) {
        currentPage--;
      }
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(res => res.json())
    .then(jsonMonsters => {
        monsterContainer.innerHTML = ""
      jsonMonsters.forEach(monster => {
      createMonsters(monster)
    })
  })
}

let currentPage = 1;

function loadMoreMonsters() {
    const monsterContainer = document.getElementById('monster-container');
    currentPage++;
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(res => res.json())
    .then(jsonMonsters => {
        monsterContainer.innerHTML = ""
      jsonMonsters.forEach(monster => {
      createMonsters(monster)
    })
  })
}