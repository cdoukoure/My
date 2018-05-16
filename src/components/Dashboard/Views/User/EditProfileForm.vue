<template>
    <el-card>
        <div class="header">
            <h4 class="title">Edit Profile</h4>
        </div>
        <div class="card-body">
            <el-form ref="form" :model="form">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="School name">
                            <el-input type="text"
                                label="Company"
                                :disabled="true"
                                placeholder="Paper dashboard"
                                v-model="profile.company">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        </el-form-item>
                        <el-form-item label="Username">
                            <el-input type="text"
                                label="Username"
                                placeholder="Username"
                                v-model="username">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Email">
                            <el-input type="email"
                                label="Username"
                                placeholder="Email"
                                v-model="profile.email">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="First Name">
                            <el-input type="text"
                                label="First Name"
                                placeholder="First Name"
                                v-model="profile.firstName">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Last Name">
                            <el-input type="text"
                                label="Last Name"
                                placeholder="Last Name"
                                v-model="profile.lastName">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="Home Address">
                            <el-input type="text"
                                label="Address"
                                placeholder="Home Address"
                                v-model="profile.address">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="City">
                            <el-input type="text"
                                label="City"
                                placeholder="City"
                                v-model="profile.city">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Country">
                            <el-input type="text"
                                label="Country"
                                placeholder="Country"
                                v-model="profile.country">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Postal Code">
                            <el-input type="number"
                                label="Postal Code"
                                placeholder="ZIP Code"
                                v-model="profile.postalCode">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="About me">
                            <el-input type="textarea" v-model="profile.aboutMe"></el-input>
                        </el-form-item>
                        <!-- <el-form-item>
                         <el-button type="primary" @click.prevent="updateProfile">Create</el-button>
                         <el-button>Cancel</el-button>
                         </el-form-item> -->
                    </el-col>
                </el-row>
                <div class="clearfix"></div>
            </el-form>
        </div>
    </el-card>
</template>
<script>
  export default {
    props: {
      username: { default () { return '' } },
      profile: { default () { return {} } }// body data
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }
</script>
<style>
.el-form-item {
    margin-bottom: 12px;
}
.el-form-item__label {
    line-height: 30px;
}
</style>
