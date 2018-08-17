<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">    

        <el-row>
          <el-col :span="12">
            <el-form-item prop="name">
              <MDinput name="name" v-model="postForm.name" required :maxlength="100">Banner名称</MDinput>
            </el-form-item>

            <el-form-item prop="description">
              <MDinput name="name" v-model="postForm.description" >Banner描述</MDinput>
            </el-form-item>   

            <el-tooltip :content="'Switch value: ' + postForm.status" placement="top">
              <el-switch
                v-model="postForm.status"
                active-text="发布"            
                active-value="publish"
                inactive-value="draft">
              </el-switch>
            </el-tooltip>
            
            <div style="margin-top:30px">
              <el-button v-loading="loading" type="success" @click="submitForm">发布</el-button>
            </div>          
          </el-col>          
        </el-row> 

      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import { validateURL } from "@/utils/validate";
import { fetchBanner, createBanner, updateBanner } from "@/api/banner";

const defaultForm = {
  name: "",   
  description: "",
  status: 1,
  id: undefined
};

export default {
  name: "BannerDetail",
  components: { MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(null);
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,      
      rules: {
        name: [{ validator: validateRequire }]
      }      
    };
  },
  
  created() { 
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;      
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }
  },

  methods: {

    fetchData(id) {      
      fetchBanner(id)
        .then(response => {          
          let banner = response.data[0];
          this.postForm = banner
          console.log(this.postForm)
        })
        .catch(err => {
          console.log(err);
        });
    },    

    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          //提交数据到服务器          
          let data = {
            ...this.postForm
          };
          // console.log(data);
          if(!this.isEdit) {
            createBanner(data).then(response => {
              this.$notify({
                title: "成功",
                message: "发布成功",
                type: "success",
                duration: 2000
              });
              this.loading = false;
              this.$router.push('/banner/list')            
            });
          }else {
            let id = this.$route.params && this.$route.params.id;
            updateBanner(id,data).then(response => {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
              this.loading = false;
              this.$router.push('/banner/list')
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;    
  }
  .el-select, .el-tooltip{
    display: block;
    margin-top: 30px;
  }
  
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
