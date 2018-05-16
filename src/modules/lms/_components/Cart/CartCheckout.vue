<template>
    <div>
        <el-card>
            <el-row class="checkout-container" style="text-align:center;">
                <el-col :span="24">
                    <h3>TOTAL <br/><small> {{ cartTotal }} cour(s) </small></h3>
                </el-col>
                <el-col :span="24">
                    <span style="font-size:40px;color:#67C23A;line-height:70px;"> {{ totalAmount }} $ </span>
                    <br/><span>TVA inclus</span>
                </el-col>
                <el-col v-if="cartTotal > 0" :span="24">
                    <hr class="hr"/>
                </el-col>
                <el-col v-if="cartTotal > 0" :span="24">
                    <el-button type="primary" @click="checkout()"> FINALISER </el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-row v-if="cartTotal > 0">
            <el-col :span="12" :offset="5">
                <el-button style="margin:20px;" type="danger" icon="el-icon-delete" size="mini" round plain @click="clearCart">Vider mon panier</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
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
            padding: 37px 10px 0px 0px;
            
            .amount {
                text-align: center;
                margin: 10px 0;
                border: 1px solid #CCC;
                border-bottom: 0;
                border-top: none;
                font-weight: 500;
                font-size: 20px;
                color: #67C23A;
            }
        
        }

    }

}

.hr {
    margin: 1.5rem 15px;
    border: 0;
    border-top-width: 0px;
    border-top-style: none;
    border-top-color: currentcolor;
    border-top: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

</style>

<script>
  export default {
    props: {
      course: { default () { return {} } }// body data
    },
    created () {
        this.$store.dispatch('$_lms/computeTotalAmountCart')
    },
    mounted () {
    },
    computed: {
        totalAmount() {
            return this.$store.getters['$_lms/cartTotalAmount']
        },
        cartTotal() {
            return this.$store.getters['$_lms/cartTotal']
        },
    },
    methods: {
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
        },
        checkout() {
            alert("CHECKOUT")
        }
    }
  }
</script>
