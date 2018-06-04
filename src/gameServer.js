import axios from 'axios'
import config from './config'

class GameServer {
    loadSeed(seedURL) {
        return axios.get(seedURL)
    }
    init(seed) {
        this.ws = new WebSocket('ws://localhost:8080') 
        return new Promise((resolve, reject) => {
            console.log('this is', this)
            this.ws.onopen = () => {
                this.ws.send('INIT'+seed)
            }
            this.ws.onmessage = (message) => {
                this.onMessage(message)
            }
            this.ws.onerror = error => reject(error)
        })
    }
    next() {
        return this.ws.send('NEXT')
    }
    onMessage(message) {
        console.log(message)
    }
}

export default new GameServer()
