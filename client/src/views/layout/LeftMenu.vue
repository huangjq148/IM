<template>
    <div class="menu-container">
        <div class="avatar">
            <img
                :src="$store.getters.curUser.avatar || 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg'"
                alt
            />
            {{$store.getters.curUser.name}}
        </div>
        <div
            :class="['cursor-pointer','top-wrap',$route.path==item.url?'active':''] "
            v-for="item in topMenu"
            :key="item.id"
            @click="handleMenuClick(item.id)"
        >
            <router-link class="left-menu" :to="item.url">
                <div class="menu-item">{{ item.name }}</div>
            </router-link>
        </div>
        <div class="bottom-wrap menu" v-for="item in bottomMenu" :key="item.id">
            <div class="menu-item">{{ item.name }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        topMenu: {
            type: Array,
            default: () => [],
        },
        bottomMenu: {
            type: Array,
            default: () => [],
        },
        currentMenu: {
            type: String,
            default: '1',
        },
    },
    model: {
        prop: 'currentMenu',
        event: 'menuClick',
    },
    methods: {
        handleMenuClick(menuId) {
            this.$emit('menuClick', menuId);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "./LeftMenu"
</style>
