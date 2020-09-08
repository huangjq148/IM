<template>
    <div class="q-input">
        <span>{{label? label+':': ''}}</span>
        <input class="input-text" 
            @input="handleInputChange" 
            v-on="$listeners"
            :value="val" 
            :type="type">
    </div>
</template>
<script>
export default {
    name: "QInput",
    props: {
        label: String,
        valueProp: String,
        type: String
    },
    data(){
        return {
            val: this.valueProp
        }
    },
    model: {
        prop: "valueProp",
        event: "input1"
    },
    methods:{
        handleInputChange(e){
            this.val = e.target.value
            this.$emit("input1", this.val);
        }
    }
}
</script>
<style lang="scss" scoped>

    .q-input{
        padding:5px;
        .input-text{
            border: none;
            height: 32px;
            font-size: 20px;
            width: 195px;
            outline: none;
        }
    }
</style>