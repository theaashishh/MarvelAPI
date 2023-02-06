
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
            <img src="${values.thumbnail.path}/${IMAGE_SIZE}.${values.thumbnail.extension}" alt="${values.name}" class=" cardimg">
           
              <button id="${values.id}" class="btns" onclick="modal_onClick(${values.id})" title="${values.name}">${values.name}</button>
            </img>
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
            <div id="${values.id}">
                <p id="close-btn" onclick="close_btn()"><img src="../images/cancle-icon.svg" alt="cancle.svg"></p>
                <h1>${values.id}</h1>
                <ul>
                ${values.comics.items.map((value)=> {
                    
                    `<li>${value.name}</li>`
                })}
                </ul>
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















