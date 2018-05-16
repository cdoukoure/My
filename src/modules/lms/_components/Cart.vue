<template>
    <el-container>
        <el-header>
        <el-row :gutter="10">
                    <el-col :span="20">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/lms' }">E-leaning Center</el-breadcrumb-item>
                <el-breadcrumb-item>My Cart</el-breadcrumb-item>
            </el-breadcrumb>
            </el-col>
            <el-col :span="4">
            <cart-status></cart-status>
            </el-col>
            </el-row>
        </el-header>
        <el-main>
            
            <el-row :gutter="40">
                <el-col :span="16">
                        <cart-item-list v-on:removeCourse="removeCourse"></cart-item-list>
                </el-col>
                <el-col :span="8">
                    <cart-checkout></cart-checkout>
                </el-col>
            </el-row>
            
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.el-header {
    width: 100%;
    padding: 9px 18px;
    height: 48px!important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
    font-size: 22px;
    position: relative;
    z-index: 0;
    font-weight: 400;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #FFF;
    border-bottom: 1px solid rgb(235, 238, 245);

    .el-row {
        width: 100%;
    }
}
.el-main {
    padding: 20px;
    min-height: calc(100vh - 48px);
    position: relative;
    float: right;
    width: 100%;
    /* width: calc(100% - 260px); */
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.el-breadcrumb {
    font-size: 1.5rem;
}
.cart-line {
    margin-bottom: 10px;
    height: 60px;
    -webkit-box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.2);
    transition: box-shadow 83ms;
    
    .el-row{
        margin: -20px !important;
        
        /deep/ .image {
            overflow: hidden;
            height: 80px;
            position: relative;
            background-color: #EFEFEF;

            img {
                width:100%;
                height:100%;
            }
        }
        
        /deep/ .card-body {
            padding:10px 30px;
            overflow: hidden;
        }
        /deep/ .functionnal {
            padding: 35px 10px 0px 0px;
            
            .amount {
                text-align: center;
                margin: 10px 0;
                border: 1px solid #CCC;
                border-bottom: 0;
                border-top: none;
                font-weight: 500;
                font-size: 26px;
                color: #67C23A;
            }
        
        }

    }
}

</style>

<script>
import CartItemList from './Cart/CartItem.vue'
import CartStatus from './Cart/CartStatus.vue'
import CartCheckout from './Cart/CartCheckout.vue'

export default {
  components: {
    CartItemList,
    CartStatus,
    CartCheckout
  },
  data () {
    return {
        loadingItem: false,
    }
  },
  created () {
    this.$store.dispatch('$_lms/computeTotalAmountCart')
  },
  mounted () {
  },
  computed: {
    totalAmount() {
        return this.$store.getters['$_lms/cartTotalAmount']
        /*var total = 0.0
        var courseInCart = this.$store.state.$_lms.cart.map(Id => this.$store.state.$_lms.entities.courses[Id])
            
        courseInCart.forEach(course => {
            total = total + course.total
        })
            
        return total*/
    },
    cartTotal() {
        return this.$store.getters['$_lms/cartTotal']
    },
  },
  methods: {
    removeCourse(payload) {
        // alert(payload)
        this.$store.commit('$_lms/CART_ITEM_REMOVE', payload)
        this.$store.dispatch('$_lms/computeTotalAmountCart')
    },
    clearCart() {
        this.$confirm('Voulez-vous réellement vider votre panier?', 'Attention', {
          confirmButtonText: 'Oui, continuez!',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
            this.$store.dispatch('$_lms/clearCart')
            this.$store.dispatch('$_lms/computeTotalAmountCart')
        }).catch(() => {
  
        })
    }
  }
}
</script>
