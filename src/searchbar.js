
const fetchheroes = async (value) => {
    let baseUrl = `${apiURL}/v1/public/characters`
    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${value}`;

    try {
        let response = await fetch(url)
        let data = await response.json();

        if (data.data.results.length === 0) {
            alert("Please Check your spelling")
        }

        let api_data = ""
        data.data.results.map((values) => {

            api_data += `
            <div id="loader">
            <sapn class="letter">MARVEL</span>
          </div>
            <div id="marvel-api" class="cards">
                 <img class="cardimg" src="${values.thumbnail.path}/${IMAGE_SIZE}.${values.thumbnail.extension}" alt="${values.name}" >
                 <button class="search_btn btns" onclick="search_Modal_Data(${values.id})" title="${values.name}">${values.name}</button>  
            </div>
            `
            document.getElementById('search-Img').innerHTML = api_data
        })

        // return data.data.results
    } catch (err) {
        return console.error(err)
    }


}

async function search_Modal_Data(id) {
    let modal = document.getElementById('modal')
    let baseUrl = `${apiURL}/v1/public/characters/${id}`
    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    console.log(id)
    modal.style.display = "flex"
    modal.style.position = "fixed"

    try {
        let response = await fetch(url)
        let data = await response.json();
        // console.log(data.data)

        let api_data = ""
        data.data.results.map((values) => {
            console.log(values)

            api_data += `
            <div id="marvel-api" class="cards">
            <p id="close-btn" onclick="close_btn()"><img src="../images/cancle-icon.svg" alt="cancle.svg"></p>
                 <img class="cardimg" src="${values.thumbnail.path}/${IMAGE_SIZE}.${values.thumbnail.extension}" alt="${values.name}" >
                 <button class="search_btn btns"  title="${values.name}">${values.name}</button>  
            </div>
            `
            document.getElementById('modal').innerHTML = api_data
        })

        // return data.data.results
    } catch (err) {
        return console.error(err)
    }



}




function handelClick() {
    let input = document.getElementById("comic-Inp")
    // console.log(input)

    let value = input.value



    if (value.length > 0) {
        let show_Search = ""

        show_Search = `
        <h1 class="search-history">Search '${value}'</h1>
        `

        document.getElementById("what-You-have-search").innerHTML = show_Search
    } else {
        return
    }


    if (value === "") return;

    try {
        let heroes = fetchheroes(value);
        return heroes
    } catch (err) {
        return console.error(err)

    }
}


