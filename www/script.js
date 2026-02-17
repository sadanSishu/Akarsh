console.log("hello world")
const endpoint = "https://6967cbc9bbe157c088b309a3.mockapi.io/api/student";

async function getStudents(){
    let respose = await fetch(endpoint)
    let data = await respose.json();
    console.log(data)
    return data;
}
async function registerStudent(e){
   e.preventDefault()
     let form = e.target.elements
     let user = {
        name: form.name.value,
        gender: form.gender.value,
        rollNo: form.rollNo.value,
        contactnumber: form.contactNumber.value,
        address: form.address.value,
     }
     let res = await fetch(endpoint,{
       method: "POST",
       headers:{
        "content-Type": "application/json"
       },
       body:JSON.stringify(user)

     })

}
function createlistItem(data){
    let list = document.createElement("li")
    list.classList.add("student-item")

    let para = document.createElement("p")
    para.textContent = data.rollNo;
}

function getStatus( data){
     if(data.isPresent == true){
          return  "Student Present"

     }else {
        return "Mark Present"
     }
}
function setStatusText(data, ele){
     if (data.isPresent == true){
        ele.textContent = "isPresent"
        ele.classList.add("present")
     }else{
        ele.textContent = "isAbsent"
        ele.classList.add("absent")
     }
   }
async function updateStudent( id,data){
     let api = endpoint + "/" + id;
     let res = await fetch(api,{
       method: "PUT",
       headers:{
          "Content-Type": "application/json"
       },
        body:JSON.stringify(data)
     })
     return await res.json()
}

function togglePresent(student, btn){
  
   

    updateStudent(student.id, { isPresent: !student.isPresent  })
    displayStudents()
}
async function deleteStudent(id){
   let api = endpoint + "/" + id;
   let res = await fetch(api,{
       method:"DELETE"
   })
}
async function displayStudents(){
    let data = await getStudents();

    let mainlist = document.getElementById("student-list")
    mainlist.textContent = ""
    for( let i = 0;i < data.length; i++){
    let listitem = document.createElement("li")
    let rollNo = document.createElement("p")
    rollNo.textContent = data[i].rollNo
    let div1 = document.createElement("div")
    let name = document.createElement("p")
    name.textContent = data[i].name
    let gender = document.createElement("p")
    gender.textContent = data[i].gender
    div1.appendChild(name)
    div1.appendChild(gender)
    let div2 = document.createElement("div")
    let phone = document.createElement("p")
    phone.textContent = data[i].phone;
    let address = document.createElement("p")
    address.textContent = data[i].address
    div2.appendChild(phone)
    div2.appendChild(address)
    div2.classList.add("hide-mobile")
    let isPresent = document.createElement("p")
    setStatusText(data[i], isPresent)
    let boxbutton = document.createElement("div")
    let isPresentbutton = document.createElement("button")
    isPresentbutton.textContent = getStatus(data[i])
    isPresentbutton.classList.add("green-btn")
    isPresentbutton.onclick = () => togglePresent(data[i],isPresentbutton)
    let removeStudent = document.createElement("button")
    removeStudent.textContent = "Remove Student"
    removeStudent.classList.add("red-btn")
    removeStudent.onclick = () => deleteStudent(data[i].id)
    boxbutton.appendChild(isPresentbutton)
    boxbutton.appendChild(removeStudent)
    boxbutton.classList.add("btn-container")
    listitem.appendChild(rollNo)
    listitem.appendChild(div1)
    listitem.appendChild(div2)
    listitem.appendChild(isPresent)
    listitem.appendChild(boxbutton)
    listitem.classList.add("student-item")
    mainlist.appendChild(listitem)
    }
    document.body.appendChild(mainlist)
}

displayStudents();

