import request from "@/utils/request"

export function loginByAccount(loginForm){
    return request.post("user/login",loginForm);
}