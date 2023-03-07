var form = document.forms['my-form'];

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);
    await axios({
        method: "POST",
        url: "http://localhost:3000/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });

    //handle success
    console.log('OK');

})