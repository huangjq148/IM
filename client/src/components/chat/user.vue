<template>
    <div
        :class="[
            'chat-list',
            chatingUserId == item.id ? 'active' : ''
        ]"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <div class="avatar-wrap">
            <img :src="item.avatar" :alt="item.name" />
        </div>
        <div class="content">
            <p>{{ item.name }}</p>
            <p>{{ item.content }}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: "user",
    props:{
        item:{
            type: Object,
            default: ()=>({
                avatar: "",
                name: "",
                content: ""
            })
        }
    },
    computed:{
        ...mapGetters(['chatingUserId'])
    }

}
</script>

<style lang="scss">
@import "./user.scss"
</style>