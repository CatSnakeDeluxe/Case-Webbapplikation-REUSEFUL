function handleEdit(id, oldTitle, oldCategory, oldPrice, oldDescription, oldVisibility) {
    const editFormElement = document.getElementById("editForm");
    // console.log("HANDLE EDIT WAS CLICKED");
    // console.log(id, oldTitle, oldCategory, oldPrice, oldDescription, oldVisibility);

    editFormElement.style = "display: flex";

    editFormElement.elements.title.value = oldTitle;
    editFormElement.elements.category.value = oldCategory;
    editFormElement.elements.price.value = oldPrice;
    editFormElement.elements.description.value = oldDescription;
    editFormElement.elements.visibility.value = oldVisibility;

    editFormElement.onsubmit = (event) => {
        event.preventDefault();

        const newTitle = editForm.elements.title.value;
        const newCategory = editForm.elements.category.value;
        const newPrice = editForm.elements.price.value;
        const newDescription = editForm.elements.description.value;
        const newVisibility = editForm.elements.visibility.value;

        fetch(`/userPage/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle, category: newCategory, price: newPrice, description: newDescription, visibility: newVisibility })
        })
            .then((response) => {
                // console.log(response);
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch((err) => console.log(err));
    };
}

setTimeout(() => {
const msg = document.getElementById("serverMessage");
msg.style.display = "none";
}, 2000);

function handleDelete(id) {
    // console.log("Delete was triggered with id", id);
    fetch(`/userPage/${id}`, { method: "DELETE" })
      .then((resp) => {
        // console.log(resp);
        if (resp.redirected) {
          window.location.href = resp.url;
        }
      })
      .catch((err) => console.log(err));
}

function handleCloseForm() {
    const editFormElement = document.getElementById("editForm");
    editFormElement.style = "display: none";
}

function addVisibilityText() {
    let visibilityText = document.getElementsByClassName("visibilityTextUserPage");

    Array.from(visibilityText).forEach(visibilityText => {
        switch (visibilityText.innerText) {
            case "public":
                visibilityText.innerText = "Active Ad";
                break;
            case "private":
                visibilityText.innerText = "Saved As Draft";
                break;
        }
    });
}

function addImg() {
    const img = document.getElementsByClassName("Image");

    Array.from(img).forEach(element => {
        switch (element.innerText) {
            case "sofas":
                element.innerHTML = "<img src='../public/img/sofa.png'>";
                break;
            case "tables":
                element.innerHTML = "<img src='../public/img/table.png'>";
                break;
            case "chairs":
                element.innerHTML = "<img src='../public/img/chair.png'>";
                break;
            case "lamps":
                element.innerHTML = "<img src='../public/img/lamp.png'>";
                break;
        }
    });
}

function filterSelection(e) {
    let x;
    x = document.querySelectorAll(".ad");
    if (e == "all") e = "";
    Array.from(x).forEach(item => {
        removeActiveClass(item, "show");
        if (item.className.indexOf(e) > -1) addActiveClass(item, "show");
    });
}

function addActiveClass(ele, name) {
    let i;
    let arr1;
    let arr2;
    arr1 = ele.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            ele.className += " " + arr2[i];
        }
    }
}

function removeActiveClass(ele, name) {
    let i;
    let arr1;
    let arr2;
    arr1 = ele.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    ele.className = arr1.join(" ");
}

let filterBtns = document.querySelector(".filterBtns");
let btns = filterBtns.getElementsByTagName("a");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

// let acc = document.getElementsByClassName("accordion");

// for (let i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function () {
//         this.classList.toggle("active");

//         let panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }

function changeIcon(x) {
    x.classList.toggle("fa-solid");
    console.log("CHANGE ICON");
}

filterSelection("all");
addImg();
addVisibilityText();