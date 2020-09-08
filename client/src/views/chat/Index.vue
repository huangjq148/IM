<template>
    <div class="container">
        <center-container>
            <div slot="left">
                <user 
                    v-for="item in recentChat"
                    :key="item.id"
                    :item="item"
                    :cur-chat-user-info = "curChatUserInfo"
                    @click="handlePersonClick(item)"
                    ></user>
            </div>

            <div slot="main" class="main-wrap">
                <div v-if="curChatUserInfo.id">
                    <div class="main-header">
                        <div class="name">
                            <span>{{ curChatUserInfo.name }}</span>
                        </div>
                    </div>
                    <div class="content" ref="content">
                        <msg v-for="word in curChatList" :msg-info="word" :key="word.id"> </msg>
                    </div>
                    <div class="footer">
                        <textarea v-model="message"></textarea>
                        <div class="button-wrap">
                            <input type="button" @click="handleSendClick" value="发送" />
                        </div>
                    </div>
                </div>
                <div v-else class="default">未选择聊天对象</div>
            </div>
        </center-container>
    </div>
</template>
<script>
import Msg from "@/components/chat/msg"
import User from "@/components/chat/user"
import CenterContainer from '@/views/layout/CenterContainer.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    data: () => {
        return {
            chatList: [],
            message: '',
            oppeningContent: {}
        };
    },
    components: {
        CenterContainer,
        Msg,
        User
    },
    watch:{
        curChatList() {
            console.log("收到消息了");
            const $content = this.$refs.content;
            if($content){
                this.$nextTick(() => {
                    $content.scrollTop = $content.clientHeight + 300;
                });
            }
        }
    },
    computed: {
        ...mapGetters(['recentChat', 'curChatList', 'curChatUserInfo']),
    },
    methods: {
        ...mapActions(['setChatingUserId', 'sendMsg']),
        handleSendClick() {
            if (this.message.trim()) {
                this.sendMsg(this.message);
                this.message = '';
                const $content = this.$refs.content;
                this.$nextTick(() => {
                    $content.scrollTop = $content.clientHeight + 600;
                });
            }
        },
        handlePersonClick(item) {
            // this.setChatingUserId(item.id);
            this.$router.push(`/redirect/chat/${item.id}`)
        }
    },
    created() {
        let id = this.$route.params.id
        
        if(id!="index"){
            this.setChatingUserId(id);
        }
    },
};
</script>
<style lang="scss" scoped>
@import './Index.scss';
</style>
