
const dailyInput = document.querySelector('.daily-input');
const dailyButton = document.querySelector('.daily-button');
const dailyList = document.querySelector('.daily-list');
const filterOption = document.querySelector('.filter-daily');


document.addEventListener("DOMContentLoaded", getDailys);
dailyButton.addEventListener('click', adddaily);
dailyList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterDaily)


function adddaily(event){
   
    event.preventDefault();

    /*<div class="daily">
        <li class="daily-item"></li>
        <button>delete</button>
        <button>Checked</button>
        </div>
        */


    //create DIV(big div)
    const dailyDiv = document.createElement("div");
    dailyDiv.classList.add("daily");

    //create LI
    const newDaily = document.createElement('li');
    newDaily.innerText = dailyInput.value;
    newDaily.classList.add('daily-item');
    dailyDiv.appendChild(newDaily);

    //add to local storage
    saveLocalDaily(dailyInput.value);

    //create checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    dailyDiv.appendChild(completedButton);

    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    dailyDiv.appendChild(trashButton);
    
    //Add to list
    dailyList.appendChild(dailyDiv);

    //clear daily input value
    dailyInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //when its delete
    if(item.classList[0] === 'trash-btn'){
        const daily = item.parentElement;

        //Anime
        daily.classList.add("fall");
        removeLocaldailys(daily);
        daily.addEventListener('transitionend', function(){
            daily.remove();
        })
        
    }
    //when its complete
    if(item.classList[0] === 'complete-btn'){
        const daily = item.parentElement;
        daily.classList.toggle("completed");
    }
}

function filterDaily(e) {

   const dailys = dailyList.childNodes;
   dailys.forEach(function(day){
    switch(e.target.value){
        case "all":
            day.style.display = 'flex';
            break;
        case "completed":
            if(day.classList.contains("completed")){
                day.style.display = 'flex';
            } else{
                day.style.display = 'none';
            }
            break;
        case "uncompleted":
            if(!day.classList.contains('completed')){
                day.style.display = 'flex';
            } else{
                day.style.display = 'none';
            }
            break;
    }
   });
    }


    function saveLocalDaily(daily){
        //check local storage
        let dailys;
        if(localStorage.getItem('dailys') === null){
            dailys = [];
        }else{
            dailys = JSON.parse(localStorage.getItem('dailys'));
        }

        dailys.push(daily);
        localStorage.setItem("dailys", JSON.stringify(dailys));

    }

    function getDailys(){
        let dailys;

        if(localStorage.getItem('dailys') === null){
            dailys = [];
        }else{
            dailys = JSON.parse(localStorage.getItem('dailys'));
        }
        dailys.forEach(function(daily){
             //create DIV(big div)
    const dailyDiv = document.createElement("div");
    dailyDiv.classList.add("daily");

    //create LI
    const newDaily = document.createElement('li');
    newDaily.innerText = daily;
    newDaily.classList.add('daily-item');
    dailyDiv.appendChild(newDaily);


    //create checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    dailyDiv.appendChild(completedButton);

    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    dailyDiv.appendChild(trashButton);
    
    //Add to list
    dailyList.appendChild(dailyDiv);

        });
    }

    function removeLocaldailys(daily){
        let dailys;

        if(localStorage.getItem('dailys') === null){
            dailys = [];
        }else{
            dailys = JSON.parse(localStorage.getItem('dailys'));
        }
        //console.log(daily.children[0]);//gives us the first element which is the Li tag
        const dailyIndex = daily.children[0].innerText;//gets the text of what you clicked
        dailys.splice(dailys.indexOf(dailyIndex), 1);
        localStorage.setItem("dailys", JSON.stringify(dailys));

    }