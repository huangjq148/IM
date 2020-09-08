<template>
    <div class="login-page">
        <div class="form-wrap">
            <div class="title" @click="handleLogin">登录</div>
            <q-input label="账号" v-model="form.username"></q-input>
            <q-input
                label="密码"
                @keypress.enter="handleLogin"
                type="password"
                v-model="form.password"
            ></q-input>
            <br />
            <q-button value="登录" @click="handleLogin"></q-button>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        userId: '',
        form: {
            username: '',
            password: '',
        },
    }),
    methods: {
        handleLogin() {
            this.$store
                .dispatch('user/login', this.form)
                .then(() => {
                    this.$router.push('/chat');
                })
                .catch(err => {
                    alert(err);
                });
        },
    },
    created() {
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password');
        if (username && password) {
            this.form.username = username;
            this.form.password = password;
            this.handleLogin();
        }
    },
};
</script>
<style lang="scss">
@import './index.scss';
</style>