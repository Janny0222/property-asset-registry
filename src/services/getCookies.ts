import axios, { AxiosResponse} from 'axios'


export const getCookie = async () => {
    try {
        const response: AxiosResponse = await axios.get('/api/getCookies')
        return response.data
    } catch (error) {
        console.log(error)
    }
}