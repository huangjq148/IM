<template>
    <div>
        <LeftMenu :top-menu="menus.topMenu" v-model="currentMenu" :bottom-menu="menus.bottomMenu" />
        <router-view></router-view>
    </div>
</template>
<script>
import LeftMenu from './LeftMenu';
import { mapGetters } from 'vuex'
export default {
    name: '',
    data() {
        return {
            currentMenu:""
        };
    },
    computed:{
        ...mapGetters(['menus']),
    },
    components: {
        LeftMenu,
    },
};
</script>
