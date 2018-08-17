<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">    

        <el-row>
          <el-col :span="12">
            <el-select v-model="postForm.hosp_id" placeholder="请选择医院" @change="handleChange">
              <el-option
                v-for="item in hosp"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-form-item prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">标题</MDinput>
            </el-form-item>

            <el-form-item prop="url">
              <MDinput name="name" v-model="postForm.url" required>Url</MDinput>
            </el-form-item>   

            <el-tooltip :content="'Switch value: ' + postForm.publish" placement="top">
              <el-switch
                v-model="postForm.publish"
                active-text="发布"            
                active-value="1"
                inactive-value="0">
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
import Upload from "@/components/Upload/singleImage3";
import MDinput from "@/components/MDinput";
import Multiselect from "vue-multiselect"; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import "vue-multiselect/dist/vue-multiselect.min.css"; // 多选框组件css
import { validateURL } from "@/utils/validate";
import { fetchBanner, createBanner, fetchHosp, updateBanner } from "@/api/article";

const defaultForm = {
  title: "", // 文章题目  
  url: "",
  publish: 1,
  id: undefined
};

export default {
  name: "TagDetail",
  components: { MDinput, Upload, Multiselect },
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
        title: [{ validator: validateRequire }]
      },
      hosp: []
    };
  },
  computed: {
    
  },
  created() { 
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;      
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }
    fetchHosp().then(response => {
      let _hosp = response.data;
      let hosp = [];
      _hosp.map((item, index, arr) => {
        hosp.push({
          value: item.id,
          label: item.name
        });
      });
      // console.log(hosp);
      this.hosp = hosp;      
    });    
  },

  methods: {

    fetchData(id) {      
      fetchBanner(id)
        .then(response => {          
          let banner = response.data[0];
          banner.publish = banner.publish.toString()           
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
