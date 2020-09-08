<template>
    <div :class="['content-text-wrap', msgInfo.isMe == 1 ? 'tr' : 'tl']">
        <img
            v-if="msgInfo.isMe != 1"
            class="content-avatar"
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg"
            alt
        />
        <div :class="['content-text', msgInfo.isMe == 1 ? 'fr' : 'fl']">
            <div class="user-info">{{ msgInfo.name }}</div>
            <div class="msg-content">{{ msgInfo.value }}</div>
        </div>
        <img
            v-if="msgInfo.isMe == 1"
            class="content-avatar"
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg"
            alt
        />
    </div>
</template>
<script>
export default {
    name: "msg",
    props:{
        msgInfo: {
            type: Object,
            default: ()=>({})
        }
    }
}
</script>
<style lang="scss">
@import "./msg.scss";
</style>