import router from './index'
import store from '@/store'

const whiteList = ["/","/login","/login/index"]

router.beforeEach(async (to,from, next)=>{

    if(whiteList.indexOf(to.path) > -1){
        next();
    }else{

        let curUser  = store.getters.curUser
        if(!curUser) {
            next("/")
        }else if(!store.getters.connection){
            store.dispatch("app/createConnect").then(()=>{
                let waitPool = [];
                waitPool.push(store.dispatch("app/initAppSettings"))
                waitPool.push(store.dispatch("addressBook/initAddressBook"))
                waitPool.push(store.dispatch("initRecentChat"))
                
                Promise.all(waitPool).then(res=>{
                    setTimeout(()=>{
                        // store.dispatch("afterConnected")
                    },100)
                    res.map(item=>{
                        console.log(item)
                    })
                    next();
                })
            })
        }else{
            next();
        }
    }
    
    // .then(re=>{
    //     console.log(re);
    //     debugger;

    // })
})