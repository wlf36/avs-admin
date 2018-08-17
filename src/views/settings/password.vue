<template>
    <div class="createPost-container">
        <el-row>
            <el-col :span="12">        
                <h2>update password</h2>
                <el-form :label-position="labelPosition" label-width="80px" :model="security">
                    <el-form-item label="原密码">
                        <el-input type="password" v-model="security.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="security.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="security.newPasswordConfirm"></el-input>
                    </el-form-item>
                    <div style="margin-top:30px">
                        <el-button type="success" @click="submitForm">Update</el-button>
                    </div>
                </el-form> 
            </el-col>     
        </el-row>
    </div>
</template>

<script>
import { updatePassword } from '@/api/user';
export default {
    name: 'Password',
    data() {
      return {
        labelPosition: 'right',
        security: {
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        }
      };
    },

    methods: {
        submitForm() {
            // console.log(this.security.oldPassword, this.security.newPassword)
            const data = {
                oldPassword: this.security.oldPassword, 
                newPassword: this.security.newPassword,
                newPasswordConfirm: this.security.newPasswordConfirm
            }
            console.log(data)
            updatePassword(data).then((response) => {
                if(response.code == 200){
                    this.$message({
                        message: response.message,
                        type: response.type
                    });
                }
                this.security.oldPassword = ''
                this.security.newPassword = ''
                this.security.newPasswordConfirm = ''
            }); 
        }
    }
}
</script>

<style scoped>
    .createPost-container{
        margin:30px;
    }
</style>


