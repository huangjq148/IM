<template>
    <div class="q-button">
        <input type="button" 
            :value="value"
            v-bind="$props"
            v-on="$listeners"
        >
    </div>
</template>
<script>
export default {
    name: "QInput",
    props: {
        value: String,
    },
    data(){
        return {
        }
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>

    .q-button{
        input{
            background: #409eff;
            border: none;
            font-size: 16px;
            padding: 8px 24px;
            outline: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
    }
</style>