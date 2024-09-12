document.addEventListener('DOMContentLoaded', () => {
    const addSoldierForm = document.getElementById('add-soldier-form');
    const soldierTable = document.getElementById('soldier-table').getElementsByTagName('tbody')[0];
    const editSection = document.getElementById('edit-section');
    const homeSection = document.getElementById('home-section');
    const editSoldierForm = document.getElementById('edit-soldier-form');
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];

    function renderTable() {
        soldierTable.innerHTML = '';
        soldiers.forEach((soldier, index) => {
            const row = soldierTable.insertRow();
            row.innerHTML = `
                <td>${soldier.fullName}</td><td>${soldier.rank}</td><td>${soldier.role}</td><td>${soldier.pluga}</td><td>${soldier.status}</td>
                <td>${soldier.taskTime}</td><td><button class="edit-button" data-index="${index}">edit</button>
                    <button class="delete-button" data-index="${index}">delete</button>
                    ${soldier.status === 'Active' || soldier.status === 'Reserve' ? `<button class="task-button" data-index="${index}">Mission</button>` : ''}
                </td>
            `;
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                soldiers.splice(index, 1); 
                localStorage.setItem('soldiers', JSON.stringify(soldiers)); 
                renderTable(); 
            });
        });

  
        document.querySelectorAll('.task-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const soldier = soldiers[index];
                soldier.status = 'Active';
                localStorage.setItem('soldiers', JSON.stringify(soldiers));
                renderTable();
            });
        });

      
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const soldier = soldiers[index];

           
                document.getElementById('edit-full-name').value = soldier.fullName;
                document.getElementById('edit-rank').value = soldier.rank;
                document.getElementById('edit-role').value = soldier.role;
                document.getElementById('edit-pluga').value = soldier.pluga;
                document.getElementById('edit-status').value = soldier.status;
                document.getElementById('edit-task-time').value = soldier.taskTime;

          
                editSoldierForm.dataset.index = index;

    
                editSection.style.display = 'block';
                homeSection.style.display = 'none';
            });
        });
    }


    editSoldierForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const index = editSoldierForm.dataset.index; 

        const fullName = document.getElementById('edit-full-name').value;
        const rank = document.getElementById('edit-rank').value;
        const role = document.getElementById('edit-role').value;
        const pluga = document.getElementById('edit-pluga').value;
        const taskTime = document.getElementById('edit-task-time').value;
        const status = document.getElementById('edit-status').value;

 
        soldiers[index] = { fullName, rank, role, pluga, taskTime, status };

    
        localStorage.setItem('soldiers', JSON.stringify(soldiers));

        // Re-render the table
        renderTable();

      
        editSection.style.display = 'none';
        homeSection.style.display = 'block';
    });


    addSoldierForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const rank = document.getElementById('rank').value;
        const role = document.getElementById('role').value;
        const pluga = document.getElementById('pluga').value;
        const taskTime = document.getElementById('task-time').value;
        const status = document.getElementById('status').value;

        const newSoldier = { fullName, rank, role, pluga, taskTime, status };

        soldiers.push(newSoldier); 
        localStorage.setItem('soldiers', JSON.stringify(soldiers)); 

        renderTable();
        addSoldierForm.reset(); 
    });


    document.getElementById('sort-button').addEventListener('click', () => {
        soldiers.sort((a, b) => a.fullName.localeCompare(b.fullName)); 
        localStorage.setItem('soldiers', JSON.stringify(soldiers)); 
        renderTable();
    });


    document.getElementById('cancel-edit').addEventListener('click', () => {
        editSection.style.display = 'none';
        homeSection.style.display = 'block'; 
    });

  
    renderTable();
});
