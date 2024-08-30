let form_button = document.getElementById("p1");
let left_div = document.getElementById("a3");
let right_div = document.querySelector(".form");
let input = document.getElementById("h2");
let text_area = document.getElementById("h3");
let submit = document.getElementById("h4");
let right1_div = document.querySelector(".Response");
let head = document.getElementById("text2");
let head1 = document.getElementById("text1");
let submit1 = document.getElementById("sub");
let hidee = document.querySelector(".aa");
let adde = document.getElementById("resp");
let rep_name = document.getElementById("e_name");
let rep_reply = document.getElementById("texth");
let resolve=document.getElementById("butt");
let search=document.getElementById("p11");
submit.addEventListener("click", sbmt);
form_button.addEventListener("click", show);
submit1.addEventListener("click", unhide);

search.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredQuestions = questions.filter(question => {
      const questionText = question.question.toLowerCase();
      return questionText.includes(searchTerm);
    });
  
    left_div.innerHTML = "";
    filteredQuestions.forEach(data => {
      var list = document.createElement("div");
      left_div.append(list);
      list.classList.add("list");
      var heading = document.createElement("h1");
      list.append(heading);
      heading.innerHTML = data.question;
      var prag = document.createElement("p");
      list.append(prag);
      prag.innerHTML = data.answer;
      let fav=document.createElement("button");
      fav.innerHTML="fav";
      list.append(fav);
      fav.classList.add("notfav");
      list.addEventListener("click", () => sh(data));
     
    });
  });
   

let questions = [];
let responses = [];

let c=0;
let b=0;

function delet(data){
    let indx = questions.findIndex(el => el.question == data.question && el.answer==data.answer && el.c==data.c);
   
    if(indx !== -1) {
        questions.splice(indx, 1);
     
        localStorage.setItem("questions", JSON.stringify(questions));
       
        let listElements = left_div.querySelectorAll('.list');
        listElements[indx].remove();
    }
     
     console.log(data.c);
   
    responses = responses.filter(response => response.b !== data.c);
    localStorage.setItem("responses", JSON.stringify(responses));

    head.innerHTML = "";
    head1.innerHTML = "";
   right1_div.classList.add("hide1");
   
    
}

function sbmt() {
    if (input.value.trim() != "" && text_area.value.trim() != ""  ) {
        var list = document.createElement("div");
        left_div.append(list);
        list.classList.add("list");
        var heading = document.createElement("h1");
        list.append(heading);
        heading.innerHTML = input.value;
        var prag = document.createElement("p");
        list.append(prag);
        prag.innerHTML = text_area.value;
        let fav=document.createElement("span");
        let i=document.createElement("i");
        i.classList.add("fa-solid","fa-star");
      
        fav.appendChild(i);
        list.append(fav);
       
        let data = {
            question: input.value,
            answer: text_area.value,
            flag:0,
            c:c,
        };
        c++;
        
       
        questions.push(data);
        localStorage.setItem("questions", JSON.stringify(questions));
        list.addEventListener("click", () => sh(data));
        fav.onclick=()=> favv(data);
        resolve.onclick=()=> delet(data);
        input.value = "";
        text_area.value = "";
    } else {
        alert("please type something");
    }
}
function favv(data) {
    console.log(data);
    if (data.flag == 0) {
        data.flag = 1;
        
    } else {
        data.flag = 0;
       
    }
    localStorage.setItem("questions", JSON.stringify(questions));
    questions.sort((a, b) => b.flag - a.flag);
  
    left_div.innerHTML = "";
    questions.forEach(data1 => {
        var list = document.createElement("div");
        left_div.append(list);
        list.classList.add("list");
        var heading = document.createElement("h1");
        list.append(heading);
        heading.innerHTML = data1.question;
        var prag = document.createElement("p");
        list.append(prag);
        prag.innerHTML = data1.answer;
        let fav=document.createElement("span");
        let i=document.createElement("i");
         i.classList.add("fa-solid","fa-star");
         
        fav.appendChild(i);
        list.append(fav)
        if (data1.flag == 1) {
           i.style.color = 'green';
        } else {
            i.style.color="black";
        }
        list.addEventListener("click", () => sh(data1));
        resolve.onclick = () => delet(data);
        fav.onclick = () => favv(data1, fav);
    });
}
function favv1(data) {
    
    questions.sort((a, b) => b.flag - a.flag);
   

    
    left_div.innerHTML = "";
    questions.forEach(data1 => {
        var list = document.createElement("div");
        left_div.append(list);
        list.classList.add("list");
        var heading = document.createElement("h1");
        list.append(heading);
        heading.innerHTML = data1.question;
        var prag = document.createElement("p");
        list.append(prag);
        prag.innerHTML = data1.answer;
        let fav=document.createElement("span");
        let i=document.createElement("i");
         i.classList.add("fa-solid","fa-star");
         
        fav.appendChild(i);
        list.append(fav)
        if (data1.flag == 1) {
           i.style.color = 'green';
        } else {
            i.style.color="black";
        }
        list.addEventListener("click", () => sh(data1));
        resolve.onclick = () => delet(data);
        fav.onclick = () => favv(data1, fav);
    });
}


function sh(data) {
  
    head.innerHTML = data.question;
    head1.innerHTML = data.answer;
    right1_div.classList.remove("hide1");
    right_div.classList.add("hide");
    resolve.onclick = () => delet(data);
    adde.innerHTML = '';
    b=data.c;
    let responses = JSON.parse(localStorage.getItem("responses"));

    let filteredResponses = responses.filter(response => response.b === data.c);
    
    filteredResponses.sort((a, b) => b.likee - a.likee);
    filteredResponses.forEach(response => {
        let div_inside = document.createElement("div");
        div_inside.classList.add("inside_div");
        adde.append(div_inside);
        let ques = document.createElement("h1");
        ques.innerHTML = response.name;
        div_inside.append(ques);
        let ans = document.createElement("h2");
        ans.innerHTML = response.reply;
        div_inside.append(ans);
        let like=document.createElement("button");
    like.innerHTML=`like${response.likee}`;
    like.classList.add("lik");
    like.onclick= ()=> likeFun(response,like);
    div_inside.append(like);
    let dislike=document.createElement("button");
    dislike.innerHTML=`dislike${response.dislikee}`;
    dislike.classList.add('lik1');
    dislike.onclick=()=> dislikfun(response,dislike);
    div_inside.append(dislike);
        
    });
}
function likeFun(resp,like){
    resp.likee+=1;
    like.innerHTML=`like${resp.likee}`;
    let indx=responses.findIndex(el=> el.name==resp.name);
    responses[indx]=resp;
    localStorage.setItem("responses",JSON.stringify(responses))
}
function dislikfun(resp,dislike){
    resp.dislikee+=1;
    dislike.innerHTML=`dislike${resp.dislikee}`;
    
    
    responses[indx]=resp;
    localStorage.setItem("responses",JSON.stringify(responses))
}
function show() {
    right_div.classList.remove("hide");
    right1_div.classList.add("hide1");
}

function unhide() {
    if( rep_name.value.trim()!=="" && rep_reply.value.trim() !=="")
        {
            let response = {
                name: rep_name.value, 
                reply: rep_reply.value,
                ques:head.innerHTML,
                b:b,
                likee:0,
                dislikee:0,
            };
            responses.push(response);
            localStorage.setItem("responses", JSON.stringify(responses));
            console.log(window);
            hidee.classList.remove("hide3");
            let div_inside = document.createElement("div");
            div_inside.classList.add("inside_div");
            adde.append(div_inside);
            let ques = document.createElement("h1");
            ques.innerHTML = rep_name.value; 
            div_inside.append(ques);
            let ans = document.createElement("h2");
            ans.innerHTML = rep_reply.value; 
            div_inside.append(ans);
            let like=document.createElement("button");
            like.innerHTML="like";
            like.classList.add("lik")
            div_inside.append(like);
            like.onclick=()=>{
                likeFun(response,like)
            }
        
            let dislike=document.createElement("button");
            
            dislike.innerHTML="dislike";
            dislike.classList.add("lik1");
            div_inside.append(dislike);
           dislike.onclick=()=>{
            dislikfun(response,dislike);
           }
        
        
        
            rep_reply.value = "";
            rep_name.value=""
        }
        else{
            alert("please type soemthing");
        }
    
}

window.onload = function () {
    if (localStorage.getItem("questions") != null) {
        questions = JSON.parse(localStorage.getItem("questions"));
           
        questions.forEach(data => {
            
            c=data.c;
            localStorage.setItem("questions", JSON.stringify(questions));
            
            var list = document.createElement("div");
            left_div.append(list);
            list.classList.add("list");
            var heading = document.createElement("h1");
            list.append(heading);
            heading.innerHTML = data.question;
            var prag = document.createElement("p");
            list.append(prag);
            prag.innerHTML = data.answer;
            let fav=document.createElement("button");
            fav.innerHTML="fav";
            list.append(fav);
            fav.classList.add("notfav");
            list.addEventListener("click", () => sh(data));
            resolve.onclick=()=> delet(data);
            favv1(data);

        });c++;
    }

    if (localStorage.getItem("responses") != null) {
        responses = JSON.parse(localStorage.getItem("responses"));
       
    }
}