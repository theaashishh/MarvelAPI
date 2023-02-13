
let apiURL = "http://gateway.marvel.com"
let baseURL = "v1/public/characters"
let apiKey = "a19ef578ea8333dc7a5060942b20ef9c"
let ts = "1"
let hash = "20390bc8f3728a476e5c50ad5f6646a1"

const url = `${apiURL}/${baseURL}?ts=${ts}&apikey=${apiKey}&hash=${hash}`
const IMAGE_SIZE = 'portrait_fantastic'



fetch(url).then((data) => {
    return data.json()
}).then((ObjectData) => {
    // console.log(ObjectData.data.results)
    const IMAGE_SIZE = 'portrait_fantastic'
    let api_data = "";
    ObjectData.data.results.map((values) => {
        api_data += `
        <div class="card1 cards" id="${values.id}">
            <img src="${values.thumbnail.path}/${IMAGE_SIZE}.${values.thumbnail.extension}" alt="${values.name}" class=" cardimg"></img>
            <button id="${values.id}" class="btns" onclick="modal_onClick(${values.id})" title="${values.name}">${values.name}</button>
        
        </div>
          `
    })


    document.getElementById("marvel_data").innerHTML = api_data
})



async function modal_onClick(id) {
    let modal = document.getElementById("modal")
    let baseUrl = `${apiURL}/v1/public/characters/${id}`
    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

    modal.style.display = "flex"
    modal.style.position = "fixed"
    console.log(id)

    try {
        let response = await fetch(url)
        let data = await response.json();
        

        let api_data = ""
        data.data.results.map((values) => {
            console.log(values)

            api_data += `

            <p id="close-btn" onclick="close_btn()"><img src="../images/cancle-icon.svg" alt="cancle.svg"></p>
            <div id="${values.id}" class="data-grid" onload="loader()">
                <h1 class="title-grid-col-span">${values.name}</h1>
                <img src="${values.thumbnail.path}/${IMAGE_SIZE}.${values.thumbnail.extension}" alt="${values.name}" class=" cardimg modal-img">
                <div class="descp-comic">
                <h4 class="category">Description : </h4>
                <p class="desc">${values.description}</p>
                <h4 class="category">Comics : </h4>
                <ul class="comic-names comic-list">${values.comics.items.map((value)=> {
                    return `<li>${value.name}</li>`
                  }).join('')}</ul>
                  </div>
            </div>

            `
            document.getElementById('modal').innerHTML = api_data   

        })


        // return data.data.results
    } catch (err) {
        return console.error(err)
    }


}

function close_btn() {
    let modal = document.getElementById("modal")


    if (modal.style.display === "flex" && modal.style.position === "fixed") {
        modal.style.display = "none"
        modal.style.position = "none"
    } else {
        return
    }
}

 var loading


const loader = () =>{
    loading  = setTimeout(show_Data, 2500)
}

function show_Data(){
    document.getElementById("loader").style.display="none"
    document.getElementById("loader").style.position="none"

}














