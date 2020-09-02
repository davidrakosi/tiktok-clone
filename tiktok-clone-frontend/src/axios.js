import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://tiktok-clone-api.herokuapp.com'
})

export default instance