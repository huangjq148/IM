<template>
    <div class="container">
        <div class="left-wrap">
            <slot name="left"></slot>  
        </div>
        <div class="main-wrap">
            <slot name="main"></slot>  
        </div>
    </div>
</template>
<script>
export default {
    name: "CenterContainer"
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        height: 100vh;
        .left-wrap{
            width: 375px;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: rgb(234, 233, 232);
        }
        .main-wrap{
            width: 100%;
            background-color: #e6e6e6;
        }
    }
</style>