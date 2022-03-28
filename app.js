const form = document.querySelector(".form")
const input = document.querySelector(".input")
const user_container = document.querySelector(".user_container")
const repository_container = document.querySelector(".repository_container")
const close_tab = document.querySelector(".close_tab")
const grid = document.querySelector(".grid")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// const search_button = document.querySelector("")
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    input.value = input.value ? input.value.trimStart() : '';
    if(input.value=='' || input.value==' '){
        return;
    }else{
    console.log(input.value)
    fetch(`https://api.github.com/users/${input.value}`)
    .then( response => response.json() )
    .then( result =>{
        const user = result
        const date_joined = user.created_at.split("T").shift().split("-")
        const bio = (user.bio != null) ? user.bio : 'This profile has no bio'
        const number_of_repositries = (user.public_repos != 0) ? `Number of repositries ${user.public_repos}` : 'This profile has no repostries'
        const company = (user.company !=null) ? user.company : 'Not Avaliable'
        const location = (user.location != null) ? user.location : 'Not Avaliable'
        const blog = (user.blog != "") ? `<a href="${user.blog}" target="_blank">${user.blog}</a>` : 'Not Avaliable'
        const twitter_username  = (user.twitter != null) ? user.twitter : 'Not Avaliable'
        document.querySelector(".number_of_repositries").innerHTML = number_of_repositries
        const DisplayUser = `
        <div class="user_card">
            <div class="user_card_header">
                <img class="user_img" src="${user.avatar_url}" alt="${user.name}_img">
                <div class="user_info">
                <h2 class="user_name">${user.name}</h2>
                <p class="user_name"><a href="${user.html_url}" target="_blank">@${user.login}</a></p>
                <p class="user_date_join">${`Joined ${date_joined[2]} ${months[date_joined[1]-1]} ${date_joined[0]}`}</p>
            </div>
        </div>
            <div class="user_card_main">
                <p class="bio">${bio}</p>
                <div class="follow_div">
                    <div class="followers">
                        <p class="follow_title">Followers</p>
                        <p class="follow_number">${user.followers}</p>
                    </div>
                    <div class="following">
                        <p class="follow_title">Following</p>
                        <p class="follow_number">${user.following}</p>
                    </div>
                </div>
            </div>
            <div class="user_card_main_footer">
                <div class="details_container">
                    <p class="details"><span><img class="detail_icon" src="image/company.png" alt="company_icon"></span> ${company}</p>
                    <p class="details"><span><img class="detail_icon" src="image/location.png" alt="location_icon"></span> ${location}</p>
                    <p class="details"><span><img class="detail_icon" src="image/link.png" alt="link_icon"></span>${blog}</a></p>
                    <p class="details"><span><img class="detail_icon" src="image/twitter.png" alt="twitter_icon"></span> ${twitter_username}</p>
                </div>
                <div class=""><button class="repository_button">Go to repositries <img class="icon_arrow" src="image/icon-arrow.svg" alt="icon_arrow"></button></div>
            </div>
        </div>
        `
        console.log(user)
        user_container.classList.add("user_container_style")
        user_container.innerHTML = DisplayUser
        document.querySelector(".repository_button").addEventListener('click' , openTab) // Go to repostries button 
        close_tab.addEventListener('click', closeTab)
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then( response => response.json() )
        .then(result =>{
                var colorCounter= 0;
                grid.innerHTML=""
                result.forEach(repository => {
                console.log(repository)
                const created_at = repository.created_at.split("T").shift().split("-")
                console.log(created_at[2],months[created_at[1]-1],created_at[0])
                const displayRepo = `
                    <h2 class="repository_name">${repository.name}</h2>
                    <p class="repository_created_date">Created at ${created_at[2]} ${months[created_at[1]-1]} ${created_at[0]}</p>
                    <p class="repository_forks">Forks <b>:</b> ${repository.forks}</P>
                    <a class="visit_repo" href="${repository.html_url}" target="_blank">Go to github repository <img class="icon_arrow" src="image/icon-arrow2.png" alt=""></a>
                `
            const Repository_card = document.createElement('div')
            Repository_card.classList.add("repository_card")
            Repository_card.innerHTML = displayRepo
            switch(colorCounter){
                case 0: Repository_card.classList.add("st"); break
                case 1: Repository_card.classList.add("nd"); break
                case 2: Repository_card.classList.add("th"); break
                case 3: Repository_card.classList.add("fourth"); break
                case 4: Repository_card.classList.add("fifht"); break
            }
            colorCounter+=1
            if(colorCounter>4){colorCounter=0;} // Reset to 0
            grid.appendChild(Repository_card)
         });
         })
        .catch(erorr => console.log(erorr) )
     })
    .catch( error => console.log(error, "safi") )
    }
})

function openTab(){
    repository_container.style.display="block"
    document.querySelector(".background-glass").style.display="block"
    user_container.style.boxShadow="none"
}
function closeTab(){
    repository_container.style.display="none"
    document.querySelector(".background-glass").style.display="none"
    user_container.style.boxShadow="0px 14px 28px -1px rgb(0 ,0 ,0 ,0.31)"
}