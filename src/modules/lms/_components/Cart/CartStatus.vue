<template>
  <el-button  type="danger" icon="el-icon-goods" :loading="this.$store.state.ui.loading" @click="goToCart()"> &nbsp; My Cart &nbsp; <el-badge class="mark" :value="cartTotal" size="mini" /></el-button>
</template>

<style lang="scss" scoped>
.el-button {
    margin:-10px 0;
    height:48px; 
    border-radius:0;
    float: right;
}
.mark {
    /deep/ .el-badge__content {
        background-color: #fff;
        border-radius: 10px;
        color: #f56c6c;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        border: 1px solid #fff;
    }
}
</style>

<script>
  export default {
    data() {
        return {
            loading: this.$store.state.ui.loading
        }// body data
    },
    computed: {
        cartTotal() {
            return this.$store.getters['$_lms/cartTotal']
        },
    },
    methods: {
        goToCart() {
            this.$router.push({ name: 'courseCart'})
        }
    }
  }
</script>
