import input from "./input"
import button from "./button"

function install(Vue){
    // Object.defineProperty(Vue,"QInput",input)
    Vue.component("QInput",input)
    Vue.component("QButton",button)
}

export default {
    install
}