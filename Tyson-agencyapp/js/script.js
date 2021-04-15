const menu = document.querySelector('.toggle')
const navigation = document.querySelector('.navigation')

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    navigation.classList.toggle('active')
})

