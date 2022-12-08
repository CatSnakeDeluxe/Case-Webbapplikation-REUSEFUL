function handleEdit(id, oldTitle, oldCategory, oldPrice, oldDescription, oldVisibility) {
    const editFormElement = document.getElementById("editForm");
    console.log("HANDLE EDIT WAS CLICKED");
    console.log(id, oldTitle, oldCategory, oldPrice, oldDescription, oldVisibility);

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
                console.log(response);
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch((err) => console.log(err));
    };
}

// setTimeout(() => {
// const msg = document.getElementById("serverMessage");
// msg.style.display = "none";
// }, 5000);

function handleDelete(id) {
    console.log("Delete was triggered with id", id);
    fetch(`/userPage/${id}`, { method: "DELETE" })
      .then((resp) => {
        console.log(resp);
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