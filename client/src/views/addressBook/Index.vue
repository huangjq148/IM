<template>
    <div class="container">
        <center-container>
            <div slot="left">
                <!-- <user
                    v-for="item in recentChat"
                    :key="item.id"
                    :item="item"
                    :cur-chat-user-info="curChatUserInfo"
                    @click="handlePersonClick(item)"
                ></user> -->
                <user
                    v-for="item in addressBookContent"
                    :key="item.id"
                    :item="item"
                    :cur-chat-user-info="curChatUserInfo"
                    @click="handlePersonClick(item)"
                ></user>
                <div class="add-wrap">
                    <q-input v-if="isAdd" @keypress.enter="handleAddFriend" v-model="addFriendId" />
                    <div v-if="!isAdd" @click="isAdd=true" class="add-btn">+</div>
                </div>
            </div>
            <div slot="main" class="main-wrap">
                请选择好友
                <!-- {{$store.getters.addressBook}} -->
            </div>
        </center-container>
    </div>
</template>
<script>
import CenterContainer from '@/views/layout/CenterContainer.vue';
import User from '@/components/chat/user';
import { mapGetters, mapActions } from 'vuex';
export default {
    data: () => {
        return {
            chatList: [],
            message: '',
            oppeningContent: {},
            addFriendId: '',
            isAdd: false,
        };
    },
    components: {
        CenterContainer,
        User,
    },
    computed: {
        ...mapGetters(['recentChat', 'curChatUserInfo', 'chatingUserId','addressBook']),
        addressBookContent() {
            return Object.keys(this.addressBook).map(item=>({
                id: item,
                name: item,
                avatar: this.addressBook[item].user.avatar
            }))
        },
    },
    methods: {
        ...mapActions(['setChatingUserId', 'sendMsg']),
        handleSendClick() {
            if (this.message.trim()) {
                this.sendMsg(this.message);
                this.message = '';
                const $content = this.$refs.content;
                this.$nextTick(() => {
                    $content.scrollTop = $content.clientHeight + 300;
                });
            }
        },
        handlePersonClick(item) {
            this.setChatingUserId(item.id);
        },
        async handleAddFriend() {
            await this.$store.dispatch(
                'addressBook/addFriend',
                this.addFriendId
            );
            this.addFriendId = '';
            this.isAdd = false;
        },
    },
    created() {
        debugger
        
    },
};
</script>
<style lang="scss">
@import './Index.scss';
</style>
