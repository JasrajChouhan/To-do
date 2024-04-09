let pattern = /^\d{4}-\d{2}-\d{2}$/;
    let pattern2 = /^\d{2}:\d{2}$/;
    let func = "";
    let codemirror = {};
    let codeclub = {};
    let toolbaroptions = [
      [{ size: ["small", "large", "huge", false] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["bold", "italic", "underline", "strike"],
      [{ indent: "+1" }, { indent: "-1" }],
      ["link", "formula"],
      [{ color: [] }],
    ]
    let objdata = {
    };
    function callmesa(event, bool) {
      if (bool) {
        document.getElementById("my-drawer-4").click();
        noofeditor = 0;
      }
      if (bool != "back") {
        let main = event.target.closest(".draggable");
        let status = main.querySelectorAll(".badge")[1];
        loaddata(main.id, event);
        let name = main.querySelectorAll("a")[0];
        document.getElementById("placename").innerText = name.innerHTML;
        document.getElementById("Status").innerText = status.innerText;
        document.getElementsByClassName("btnhide")[0].id = main.id;
        if (status.innerText === "in Progress") {
          document.getElementById("statMessage").innerText = "You have Time. Work on the Task";
        } else if (status.innerText === "Pending") {
          document.getElementById("statMessage").innerText = "Oops You are Running late!";
        } else if (status.innerText === "Completed") {
          document.getElementById("statMessage").innerText = "Yeah! Task is Completed";
        }
        func = setInterval(() => {
          let status = main.querySelectorAll(".badge")[1];
          document.getElementById("Status").innerText = status.innerText;
          if (status.innerText === "in Progress") {
            document.getElementById("statMessage").innerText = "You have Time. Work on the Task";
          } else if (status.innerText === "Pending") {
            document.getElementById("statMessage").innerText = "Oops You are Running late!";
          } else if (status.innerText === "Completed") {
            document.getElementById("statMessage").innerText = "Yeah! Task is Completed";
          }
        }, 1000);
        if (main) {
          document.getElementById("date").innerText = main.getAttribute("created-at-date");
          document.getElementById("time").innerText = "at" + " " + main.getAttribute("created-at-time");
          if (main.getAttribute("data-date") == null || !pattern.test(main.getAttribute("data-date"))) {
            document.getElementById("Duedate").innerText = "Not Selected";
            document.getElementById("DueTime").innerText = "Not Selected";
          } else if ((main.getAttribute("data-date") != null && pattern.test(main.getAttribute("data-date"))) && (main.getAttribute("data-time") == null || !pattern2.test(main.getAttribute("data-time")))) {
            document.getElementById("Duedate").innerText = main.getAttribute("data-date");
            document.getElementById("DueTime").innerText = "Not Selected";
          } else {
            document.getElementById("Duedate").innerText = main.getAttribute("data-date");
            document.getElementById("DueTime").innerText = "at" + " " + main.getAttribute("data-time");
          }
        }
      }
      if (bool == 'back' || bool == "back") {
        clearInterval(func);
        document.getElementById("main-grid").innerHTML = "";
      }
    }
    let dataquill = {};
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes() + 15).padStart(2, '0');
    let mini = String(today.getMinutes()).padStart(2, '0');
    let need = '';
    let keyi = "";
    let keysub = "";
    let removal = '';
    let newname = '';
    let maini = document.getElementById("main");
    today = yyyy + '-' + mm + '-' + dd;
    timei = hh + ':' + min;
    time = hh + ':' + mini;
    function uploadFile(target) {
      var fileInput = document.getElementById('fileInput');
      var file = fileInput.files[0];
      var allowedExtensions = ['png', 'jpeg', 'jpg'];
            var extension = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                alert('Only .png, .jpeg, and .jpg files are allowed.');
                return;
            }
      if (!file) {
        alert('Please select a file.');
        return;
      }
      document.querySelector('p').innerText = "Loading..."
      var accessToken = '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'
      var owner = 'hemang111'
      var repo = 'To-do';
      var math = Math.ceil(Math.random() * 1000)
      var path = `source/Images/file${math}.png`;
      var apiUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path;
      var reader = new FileReader();
      reader.onload = function (event) {
        var content = event.target.result;
        var requestData = {
          message: 'Upload ' + file.name,
          content: btoa(content), 
          branch: 'main' 
        };
        fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Authorization': 'token ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to upload file: ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log(data)
            const codestuff = document.createElement("div");
            codestuff.className = "act";
            const codename = target + Math.ceil(Math.random() * 1000);
            if (!objdata[target]) {
              objdata[target] = {};
              objdata[target].editorData = {};
            }
            objdata[target].editorData[codename] = {};
            objdata[target].editorname = target;
            objdata[target].editorData[codename].image = math;
            let keyigi = target;
            codestuff.style.width = "300px";
            codestuff.innerHTML = `   <div>
            <div style=" border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
              <div style="padding:15px">
                <p>Image Block</p>
              </div>
              <div class="dropdown">
                <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
                <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                  style="z-index:1000 ;width:fit-content; padding:10px">
                  <li onclick="deleteNaar('${keyigi}','${codename}' , event)"><a
                      onclick="deleteNgar('${keyigi}','${codename}',event)"> Delete</a></li>
                </ul>
              </div>
            </div>
            <div style="width: 300px; border: 1px solid white ;">
              <img
                style="position:relative; left: 50% ; height: 340px; display: non;max-width: 300px; transform: translate(-50%);border:1px solid white"
                src="https://raw.githubusercontent.com/hemang111/To-do/main/source/Images/file${math}.png" alt="">
            </div>
          </div>`;
            document.getElementById("main-grid").appendChild(codestuff);
              localStorage.setItem('jalina', JSON.stringify(objdata));
          })
              .catch(error => {
                console.error('Error uploading file:', error);
              });
          };
        reader.readAsBinaryString(file);
      }
      function selectImage(e) {
        uploadFile(e.target.closest(".selection").getAttribute("data-main"));
      }
      function doaimage(e) {
        document.getElementById('my_modal_8').showModal();
        document.getElementById('my_modal_8').setAttribute("data-main" , e.target.closest(".dropdown").id);
      }
      function doacode(e, ops) {
        const elem = document.activeElement;
        const codestuff = document.createElement("div");
        codestuff.className = "act";
        const codename = e.target.closest(".dropdown").id + Math.ceil(Math.random() * 1000);
        if (!objdata[e.target.closest(".dropdown").id]) {
          objdata[e.target.closest(".dropdown").id] = {};
          objdata[e.target.closest(".dropdown").id].editorData = {};
        }
        objdata[e.target.closest(".dropdown").id].editorData[codename] = {};
        objdata[e.target.closest(".dropdown").id].editorname = e.target.closest(".dropdown").id;
        objdata[e.target.closest(".dropdown").id].editorData[codename].code = "";
        let keyigi = e.target.closest(".dropdown").id;
        codestuff.style.width = "300px";
        codestuff.innerHTML = `<div>
                <div style = " border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
                 <div style = "padding:15px" ><p>Code Block</p></div>
                 <div class="dropdown">
                    <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
                    <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                      style="z-index:1000 ;width:fit-content; padding:10px">
                      <li onclick="deleteNagar('${keyigi}','${codename}' , event)" ><a onclick="deleteNagar('${keyigi}','${codename}',event)" > Delete</a></li>  
                    </ul>
                  </div>
                </div>  
                 <div style="width: 100% ; color: aliceblue; border:1px solid white" 
                 id="${codename}"></div></div>`;
        document.getElementById("main-grid").appendChild(codestuff);
        codemirror[codename] = new CodeMirror(document.querySelector('#' + codename), {
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          value: '//javascript is used for the default syntax highlighting ',  
          mode: 'javascript',   
          theme: 'monokai'
        });
        codemirror[codename].on("change", function () {
          objdata[e.target.closest(".dropdown").id].editorData[codename].code = codemirror[codename].getValue();
          localStorage.setItem('jalina', JSON.stringify(objdata));
        });
      }
      function doquill(e, ops) {
        const elem = document.activeElement;
        const mainstuff = document.createElement("div");
        mainstuff.className = "act";
        noofeditor++;
        const editorname = e.target.closest(".dropdown").id + Math.ceil(Math.random() * 1000);
        keysub = editorname;
        if (!objdata[e.target.closest(".dropdown").id]) {
          objdata[e.target.closest(".dropdown").id] = {};
          objdata[e.target.closest(".dropdown").id].editorData = {};
        }
        objdata[e.target.closest(".dropdown").id].editorname = e.target.closest(".dropdown").id;
        objdata[e.target.closest(".dropdown").id].editorData[editorname] = {};
        objdata[e.target.closest(".dropdown").id].editorData[editorname].ta = {};
        let keyig = e.target.closest(".dropdown").id;
        mainstuff.style.width = "300px";
        mainstuff.innerHTML = `<div>
          <div style = " border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
           <div style = "padding:15px" ><p>Text Block</p></div>
           <div class="dropdown">
              <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
              <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                style="z-index:1000 ;width:fit-content; padding:10px">
                <li  data-index = '${editorname}' onclick="deleteNagar('${keyig}','${editorname}'  event)"><a>Delete</a></li>
              </ul>
            </div>
          </div>  
           <div style="width: 100%; height:250px; color: aliceblue;" 
           oninput="chala('${keyig}','${editorname}')" id="${editorname}"></div></div> `
        document.getElementById("main-grid").appendChild(mainstuff);
        dataquill[editorname] = new Quill("#" + editorname, {
          modules: {
            toolbar: toolbaroptions,
          },
          theme: "snow",
        })
        const elemi = document.activeElement();
        if (elemi) {
          elemi?.blur();
        }
        localStorage.setItem('jalina', JSON.stringify(objdata));
      }
      function chala(key, event) {
        let data = dataquill[event].getContents();
        objdata[key].editorData[event].ta = data;
        localStorage.setItem('jalina', JSON.stringify(objdata));
      }
      function deleteNagar(keyM, keyt, event) {
        delete objdata[keyM].editorData[keyt];
        delete dataquill[keyt];
        event.target.closest(".act").remove();
        localStorage.setItem('jalina', JSON.stringify(objdata));
      }
      function loaddata(key, e) {
        if (objdata[key]) {
          let mania = Object.keys(objdata[key].editorData);
          for (var i = 0; i < mania.length; i++) {
            editorname = mania[i];
            const mainstuff1 = document.createElement("div");
            mainstuff1.className = "act";
            mainstuff1.style.width = "300px";
            if (Object.keys(objdata[key].editorData[editorname])[0] == "ta") {
              mainstuff1.innerHTML = `<div>
          <div style = " border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
           <div style = "padding:15px" ><p>Text Block</p></div>
           <div class="dropdown">
              <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
              <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                style="z-index:1000 ;width:fit-content; padding:10px">
                <li data-index = "${editorname}" onclick="deleteNagar('${objdata[key].editorname}' ,'${editorname}',event)"><a>Delete</a></li>
              </ul>
            </div>
          </div>  
           <div style="width: 100%; height:250px; color: aliceblue;" 
           oninput="chala('${objdata[key].editorname}' ,'${editorname}')" id="${editorname}"></div></div> `
              document.getElementById("main-grid").appendChild(mainstuff1);
              noofeditor++;
              dataquill[editorname] = new Quill("#" + editorname, {
                modules: {
                  toolbar: toolbaroptions,
                },
                theme: "snow",
              })
              dataquill[editorname].setContents(objdata[key].editorData[editorname].ta);
            }
            else if (Object.keys(objdata[key].editorData[editorname])[0] == "code"){
              mainstuff1.innerHTML = `<div>
                <div style = " border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
                 <div style = "padding:15px" ><p>Code Block</p></div>
                 <div class="dropdown">
                    <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
                    <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                      style="z-index:1000 ;width:fit-content; padding:10px">
                      <li onclick = "deleteNagar('${objdata[key].editorname}' ,'${editorname}',event)"><a>Delete</a></li>  
                    </ul>
                  </div>
                </div>  
                 <div style="width: 100% ; color: aliceblue; border:1px solid white" 
                 id="${editorname}"></div></div>`;
              document.getElementById("main-grid").appendChild(mainstuff1);
              codemirror[editorname] = new CodeMirror(document.querySelector('#' + editorname), {
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2,
                value: '//javascript is used for the default syntax highlighting.', 
                mode: 'javascript',
                theme: 'monokai'
              });
              if (objdata[key].editorData[editorname].code.trim() === '') {
                codemirror[editorname].setValue("//javascript is used for the default syntax highlighting");
              }
              else {
                codemirror[editorname].setValue(objdata[key].editorData[editorname].code);
              }
              codemirror[editorname].on("change", function () {
                objdata[key].editorData[editorname].code = codemirror[editorname].getValue();
              });
            }
            else{
              let stain = objdata[key].editorData[editorname].image;
              mainstuff1.innerHTML = ` <div>
            <div style=" border:1px solid white; display:flex;justify-content:space-between;align-content:center; ">
              <div style="padding:15px">
                <p>Image Block</p>
              </div>
              <div class="dropdown">
                <div tabindex="0" role="button" class="btn"><i class="fa-solid fa-ellipsis"></i></div>
                <ul tabindex="0" class="dropdown-content shadow bg-base-300 rounded-box "
                  style="z-index:1000 ;width:fit-content; padding:10px">
                  <li onclick="deleteNagar('${objdata[key].editorname}' ,'${editorname}',event)"><a
                      onclick="deleteNagar('${objdata[key].editorname}' ,'${editorname}',event)"> Delete</a></li>
                </ul>
              </div>
            </div>
            <div style="width: 300px; border: 1px solid white ;">
              <img
                style="position:relative; left: 50% ; height: 340px; display: non;max-width: 300px; transform: translate(-50%);border:1px solid white"
                src="https://raw.githubusercontent.com/hemang111/To-do/main/source/Images/file${stain}.png" alt="">
            </div>
          </div>`
          document.getElementById("main-grid").appendChild(mainstuff1);
            }
            localStorage.setItem('jalina', JSON.stringify(objdata));
          }
        }
      }
      function fullreset(e) {
        const mains = e.target.closest(".menu");
        const draggable = mains.querySelectorAll(".draggable");
        draggable.forEach((drag) => {
          drag.remove();
        })
      }
      function changestatusnow(e) {
        const data = e.target.closest(".listdata");
        const mainblob = e.target.closest(".draggable");
        if (e.target.checked) {
          data.querySelector("a").style.textDecoration = "line-through";
          e.target.setAttribute("checked", "checked")
          mainblob.querySelectorAll(".badge")[1].innerHTML = `<i class="fa-regular fa-circle-check"></i> Completed`;
          mainblob.querySelectorAll(".badge")[1].classList.remove("badge-info");
          mainblob.querySelectorAll(".badge")[1].classList.remove("badge-warning");
          mainblob.querySelectorAll(".badge")[1].classList.add("badge-success");
        }
        else {
          data.querySelector("a").style.textDecoration = "none";
          mainblob.querySelectorAll(".badge")[1].classList.remove("badge-success");
          e.target.removeAttribute("checked")
          checkstatus();
        }
        savedata();
      }
      function reset() {
        localStorage.clear()
        window.location.reload();
      }
      setInterval(() => {
        today = new Date();
        dd = String(today.getDate()).padStart(2, '0');
        mm = String(today.getMonth() + 1).padStart(2, '0');
        yyyy = today.getFullYear();
        hh = String(today.getHours()).padStart(2, '0');
        min = String(today.getMinutes() + 10).padStart(2, '0');
        mini = String(today.getMinutes()).padStart(2, '0')
        today = yyyy + '-' + mm + '-' + dd;
        time = hh + ':' + mini;
        timei = hh + ':' + min;
      }, 30000)
      function currenttime() {
        let todayi = new Date();
        dd = String(todayi.getDate()).padStart(2, '0');
        mm = String(todayi.getMonth() + 1).padStart(2, '0');
        yyyy = todayi.getFullYear();
        hh = String(todayi.getHours()).padStart(2, '0');
        min = String(todayi.getMinutes() + 10).padStart(2, '0');
        mini = String(todayi.getMinutes()).padStart(2, '0')
        return {
          today: (yyyy + '-' + mm + '-' + dd),
          time: (hh + ':' + mini)
        };
        timei = hh + ':' + min;
      }
      setInterval(() => {
        checkstatus();
      }, 120000)
      function checkcurrent(e) {
        const selected = new Date(e.target.value + 'T' + "00:00");
        const compare = new Date(today + 'T' + "00:00");
        if (selected.getDate() === compare.getDate()) {
          document.querySelector('input[type="time"]').min = timei;
        }
        else {
          document.querySelector('input[type="time"]').min = ' ';
        }
      }
      function deletethelist(e) {
        const todelete = e.target.closest(".menu");
        const modal = document.getElementById("my_modal_6");
        modal.showModal();
        removal = todelete;
        savedata();
      }
      function makenote(e) {
        const input = e.target.querySelector("input").value;
        newname = input;
        e.target.querySelector("input").value = "";
        const demotoclone = document.getElementById("demo2");
        const newdata = demotoclone.cloneNode(true);
        newdata.id = newname.trim() + Math.ceil(Math.random() * 1000);
        newdata.querySelector("a").innerText = newname;
        need.querySelector('.dragArea').appendChild(newdata);
        callme();
        savedata();
      }
      function deleting(e) {
        let main = removal.querySelectorAll(".draggable");
        if(main){
          main.forEach((item)=>{
            delete objdata[item.id];
          })
        }
        removal.remove();
        savedata();
        localStorage.setItem('jalina', JSON.stringify(objdata));
      }
      function createanote(e) {
        const main = e.target.closest(".menu");
        const modal = document.getElementById("my_modal_7");
        modal.showModal();
        need = main;
      }
      function checkstatus() {
        const draggables = [...document.querySelectorAll(".draggable:not(.demo)")];
        draggables.forEach((draggable) => {
          const draggableDate = draggable.getAttribute("data-date");
          const draggableTime = draggable.getAttribute("data-time");
          if (draggableDate == null || draggableDate == " " || draggableDate == '' || draggableDate == ' ' || !draggableDate) {
            const main = draggable.querySelector(".chid");
            if (main.querySelectorAll(".badge")[1].classList.contains("badge-success")) {
            }
            else {
              main.querySelectorAll('.badge')[1].innerHTML = ` <i class="fa-regular fa-clock"></i> Not selected`;
              main.querySelectorAll('.badge')[1].classList.remove("badge-info");
              main.querySelectorAll(".badge")[1].classList.add("badge-warning");
            }
          }
          else if (draggableDate && !draggableTime) {
            const draggableDateTime = new Date(draggableDate + 'T' + "00:00");
            const currentDateTime = new Date(today + 'T' + "00:00");
            if (draggableDateTime > currentDateTime) {
              const main = draggable.querySelector(".chid");
              if (main.querySelectorAll('.badge')[1].classList.contains("badge-success")) {
              }
              else {
                main.querySelectorAll('.badge')[1].innerHTML = ` <i class="fa-regular fa-clock"></i> in Progress`;
                main.querySelectorAll(".badge")[1].classList.remove("badge-warning");
                main.querySelectorAll('.badge')[1].classList.add("badge-info");
              }
            }
            else if (draggableDateTime <= currentDateTime) {
              const main = draggable.querySelector(".chid");
              if (main.querySelectorAll(".badge")[1].classList.contains("badge-success")) {
              }
              else {
                main.querySelectorAll('.badge')[1].classList.remove("badge-info");
                main.querySelectorAll('.badge')[1].innerHTML = ` <i class="fa-regular fa-clock"></i> Pending`;
                main.querySelectorAll(".badge")[1].classList.add("badge-warning");
              }
            }
          }
          else {
            const draggableDateTime = new Date(draggableDate + 'T' + draggableTime);
            const currentDateTime = new Date(today + 'T' + time);
            if (draggableDateTime > currentDateTime) {
              const main = draggable.querySelector(".chid");
              if (main.querySelectorAll('.badge')[1].classList.contains("badge-success")) {
              }
              else {
                main.querySelectorAll('.badge')[1].innerHTML = ` <i class="fa-regular fa-clock"></i> in Progress`;
                main.querySelectorAll(".badge")[1].classList.remove("badge-warning");
                main.querySelectorAll('.badge')[1].classList.add("badge-info");
              }
            }
            else if (draggableDateTime <= currentDateTime) {
              const main = draggable.querySelector(".chid");
              if (main.querySelectorAll('.badge')[1].classList.contains("badge-success")) {
              }
              else {
                main.querySelectorAll('.badge')[1].innerHTML = ` <i class="fa-regular fa-clock"></i> Pending`;
                main.querySelectorAll('.badge')[1].classList.remove("badge-info");
                main.querySelectorAll(".badge")[1].classList.add("badge-warning");
              }
            }
          }
        });
        savedata();
      }
      function selectdateandtime() {
        const date = document.querySelector('input[type="date"]').value;
        const timei1 = document.querySelector('input[type="time"]').value;
        const demotoclone = document.getElementById("demo");
        const newdata = demotoclone.cloneNode(true);
        document.querySelector('input[type="date"]').value = "";
        document.querySelector('input[type="time"]').value = "";
        newdata.id = "task" + Math.ceil(Math.random() * 1000);
        newdata.classList.remove("demo");
        newdata.querySelector("a").innerText = newname;
        let ctime = currenttime();
        if ((date != null || date != ' ' || !date || date != '') && (timei1 != null || timei1 != ' ' || timei1 != '' || !timei1) && pattern.test(date) && pattern2.test(timei1)) {
          newdata.setAttribute("data-date", date);
          newdata.setAttribute("data-time", timei1);
          newdata.setAttribute("created-at-date", ctime.today);
          newdata.setAttribute("created-at-time", ctime.time);
          need.querySelector('.dragArea').appendChild(newdata);
          checkstatus();
          savedata();
        }
        else if (date != null && pattern.test(date) && !pattern2.test(timei1)) {
          newdata.setAttribute("data-date", date);
          newdata.setAttribute("created-at-date", ctime.today);
          newdata.setAttribute("created-at-time", ctime.time);
          need.querySelector('.dragArea').appendChild(newdata);
          checkstatus();
          savedata();
        }
        else if ((timei1 != null || timei1 != ' ' || timei1 != '' || !timei1 || timei1 != " " || timei1) && !pattern.test(date) && pattern2.test(timei1)) {
          alert("please select the date");
        }
        else {
          newdata.setAttribute("data-time", " ");
          newdata.setAttribute("data-data", " ");
          newdata.setAttribute("created-at-date", ctime.today);
          newdata.setAttribute("created-at-time", ctime.time);
          need.querySelector('.dragArea').appendChild(newdata);
          checkstatus();
          savedata();
        }
        checkstatus();
        callme();
        savedata();
      }
      function takedateandtime(e) {
        const input = e.target.querySelector("input").value;
        if (input.trim() == '') {
          alert("pls enter task name. You cannot leave it empty")
        }
        else {
          newname = input;
          e.target.querySelector("input").value = "";
          const modal = document.getElementById("my_modal_5");
          modal.showModal();
          savedata();
          checkstatus();
        }
      }
      function doaTask(e) {
        const main = e.target.closest(".menu");
        const modal = document.getElementById("my_modal_4");
        modal.showModal();
        need = main;
      }
      function deleteit(e) {
        const main = e.target.closest('.draggable');
        const dragmains = main.closest('.dragArea');
        const openit = document.getElementById("my_modal_3");
        openit.showModal();
        need = main;
        removal = dragmains;
        savedata();
      }
      function handlesubmit3() {
        delete objdata[need.id];
        removal.removeChild(need);
        savedata();
        localStorage.setItem('jalina', JSON.stringify(objdata));
      }
      function handlesubmit2() {
        const input = document.getElementById("check").value;
        const data = document.getElementById(input.trim());
        if (data && input.trim() != "main") {
          if (need.classList.contains("color")) {
            const beforebig = data.querySelector(".dragArea");
            const before = beforebig.querySelector(".draggable");
            beforebig.insertBefore(need, before);
          } else {
            data.querySelector(".dragArea").appendChild(need);
          }
        }
        else {
          alert("no such list exist");
        }
        document.getElementById("check").value = "";
        savedata();
      }
      function moveyouTo(e) {
        const main = e.target.closest('.draggable');
        const openit = document.getElementById("my_modal_2");
        openit.showModal();
        need = main;
        savedata();
      }
      function doabackbuka(e) {
        const main = e.target.closest('.draggable');
        let Starindex = 0;
        let afterelement;
        const dragmains = main.closest('.dragArea');
        const iterabledata = [...dragmains.querySelectorAll('.draggable')];
        if (main.classList.contains('color')) {
          e.target.innerText = "Star it"
          let count = 0;
          iterabledata.forEach((item, index) => {
            if (item.classList.contains('color')) {
              count++;
            }
          })
          if (count == 1) {
            main.classList.remove('color');
          } else {
            iterabledata.forEach((item, index) => {
              if (!item.classList.contains('color')) {
                dragmains.insertBefore(main, item);
                return;
              }
            })
            setTimeout(() => {
              main.classList.remove('color');
            }, 100)
          }
        }
        else {
          e.target.innerText = "Unstar"
          main.classList.add('color')
          main.id = "targeted";
          iterabledata.forEach((item, index) => {
            if (item.id && item.id == "targeted") {
              Starindex = index;
            }
          })
          if (Starindex === 0) {
          }
          else {
            afterelement = iterabledata[0];
            dragmains.insertBefore(main, afterelement)
          }
          setTimeout(() => {
            main.id = "";
          }, 100);
        }
        savedata();
      }
      function doafunction(e) {
        let current = 0;
        let afterelement;
        const main = e.target.closest('.draggable');
        const dragmains = main.closest('.dragArea');
        main.id = "targeted";
        const iterabledata = [...dragmains.querySelectorAll('.draggable')];
        iterabledata.forEach((item, index) => {
          if (item.id && item.id == "targeted") {
            current = index;
          }
        })
        iterabledata.forEach((item, index) => {
          if (item.id && item.id == "targeted") {
          }
          else if (index === current - 1 && !item.classList.contains("color")) {
            afterelement = item;
          }
          else if (index === current - 1 && item.classList.contains("color")) {
            alert("cannot go up of a starred Task/Note.")
          }
        })
        if (!afterelement) {
        }
        else {
          dragmains.insertBefore(main, afterelement)
        }
        setTimeout(() => {
          main.id = "";
        }, 100);
        savedata();
      }
      function handlesubmit(e) {
        e.preventDefault();
        const pre = document.querySelectorAll(".menu-title");
        const titles = Array.from(pre).map((item) => {
          return item.innerText;
        });
        const title = document.querySelector(".inputi").value;
        if (title.length > 50) {
          document.getElementById("error").play();
          const modal = document.getElementById("my_modal_1");
          modal.querySelector("h3").innerText = "Alert ⚠️"
          modal.querySelector("p").innerText = "Title cannot be more than 50 characters pls Renter the title and make sure to be under 50 Characters"
          setTimeout(() => {
            my_modal_1.showModal();
          }, 800)
        }
        else if (title.trim() == "main" || title.trim() == "") {
          document.getElementById("error").play();
          const modal = document.getElementById("my_modal_1");
          modal.querySelector("h3").innerText = "Alert ⚠️"
          modal.querySelector("p").innerText = "The Title for the new list you entered can not be small main or left empty."
          setTimeout(() => {
            my_modal_1.showModal();
          }, 800)
        }
        else if (titles.includes(title)) {
          document.getElementById("error").play();
          const modal = document.getElementById("my_modal_1");
          modal.querySelector("h3").innerText = "Alert ⚠️"
          modal.querySelector("p").innerText = "The Title for the new list you entered already exist pls enter a different Title."
          setTimeout(() => {
            my_modal_1.showModal();
          }, 800)
        }
        else {
          document.getElementById("success").currentTime = 0;
          document.getElementById("success").play();
          const org = document.getElementById("org");
          const clone = org.cloneNode(true);
          clone.querySelector(".menu-title").innerText = title;
          clone.id = title.trim();
          clone.style.display = "flex";
          clone.classList.remove("main");
          const appentto = document.getElementById("main");
          appentto.appendChild(clone);
          callme();
          savedata();
        }
        document.querySelector(".inputi").value = "";
        savedata();
      }
      function callme() {
        const todrag = document.querySelectorAll(".draggable");
        const todropin = document.querySelectorAll(".dragArea"); 
        todrag.forEach(item => {
          item.addEventListener('dragstart', function (e) {
            item.classList.add("Drag");
          })
          item.addEventListener('dragend', function (e) {
            item.classList.remove("Drag");
          })
        })
        todropin.forEach(item => {
          item.addEventListener('dragover', function (e) {
            e.preventDefault();
            const toappendbefore = getoffsetclose(item, e.clientY);
            const maindrag = document.querySelector(".Drag");
            const ul = item.querySelector(".draggable");
            if (ul && maindrag.classList.contains("color")) {
              item.insertBefore(maindrag, ul);
            }
            else if (toappendbefore && toappendbefore.classList.contains("color")) {
              item.appendChild(maindrag);
            }
            else {
              if (!toappendbefore) {
                item.appendChild(maindrag)
              }
              else {
                item.insertBefore(maindrag, toappendbefore);
              }
            }
            savedata();
          })
        })
        function getoffsetclose(container, y) {
          const items = [...container.querySelectorAll(".draggable:not(.Drag)")];
          if (items.length === 0) return null;
          return Array.from(items).reduce((closest, child) => {
            const target = child.getBoundingClientRect();
            const offset = y - target.top - target.height / 2;
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          }, { offset: Number.NEGATIVE_INFINITY }).element
        }
      }
      function savedata() {
        const menuElements = [...document.querySelectorAll(".menu:not(.main)")];
        const menuInnerHtmlArray = [];
        for (let i = 0; i < menuElements.length; i++) {
          menuInnerHtmlArray.push(menuElements[i].innerHTML);
        }
        const jsonData = JSON.stringify(menuInnerHtmlArray);
        localStorage.setItem("menuData", jsonData);
      }
      window.addEventListener("load", function () {
        const storedData = localStorage.getItem("menuData");
        const jalina = localStorage.getItem("jalina");
        if (jalina) {
          objdata = JSON.parse(jalina)
        }
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          parsedData.forEach((data) => {
            const div = document.createElement('div');
            div.classList = "menu bg-base-200 rounded-box loaded";
            div.innerHTML = data;
            let nid = div.querySelector("h2").innerText;
            div.id = nid;
            document.getElementById("main").appendChild(div);
          });
          document.getElementById("Main").remove();
        } else {
        }
        checkstatus();
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        callme();
      });
      document.querySelector('input[type = "date"]').min = today;
      callme();
      setTimeout(() => {
        if (objdata) {
        }
      }, 30000);