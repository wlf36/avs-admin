<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
            <div class="createPost-main-container">

                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name">
                            <MDinput name="name" v-model="postForm.title" required :maxlength="100">项目名称</MDinput>
                        </el-form-item>

                        <el-form-item prop="description">
                            <MDinput name="name" v-model="postForm.description">项目描述</MDinput>
                        </el-form-item>

                        <el-form-item prop="name">
                            <MDinput name="name" v-model="postForm.url_id">跳转ID</MDinput>
                        </el-form-item>

                        <el-form-item label="跳转类别：">
                            <el-radio v-model="postForm.url_type" label="1">商品</el-radio>
                            <el-radio v-model="postForm.url_type" label="2">分类</el-radio>
                            <el-radio v-model="postForm.url_type" label="3">标签</el-radio>
                        </el-form-item>

                        <div class="up-container">
                            <el-upload ref="upload" :action="file_api" :auto-upload="true" :on-remove="removeImage" :on-success="uploadImageSuccess" :headers="headers" :file-list="fileList" list-type="picture">
                                <el-button size="small" type="primary">上传缩略图</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                            </el-upload>
                        </div>

                        <el-tooltip :content="'Switch value: ' + postForm.status" placement="top">
                            <el-switch v-model="postForm.status" active-text="发布" active-value="publish" inactive-value="draft">
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
import Upload from "@/components/Upload/singleImage3";
import { validateURL } from "@/utils/validate";
import { fetchBannerItem, createBannerItem, updateBannerItem } from "@/api/bannerItem";
import { removeFile } from "@/api/file";
import { getToken } from "@/utils/auth";

const defaultForm = {
    title: "",
    description: "",
    status: 1,
    url_id: null,
    url_type: null,
    id: undefined
};

export default {
    name: "BannerItem",
    components: { MDinput, Upload },
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
            headers: {
                Authorization: "Bearer " + getToken()
            },
            file_api: `${process.env.BASE_API}/image`,
            imgId: [],
            fileList: [],
            postForm: Object.assign({}, defaultForm),
            loading: false,
            rules: {
                name: [{ validator: validateRequire }]
            }
        };
    },

    created() {
        if (this.isEdit) {
            const id = this.$route.params && this.$route.params.banneritem_id;
            this.fetchData(id);
        } else {
            this.postForm = Object.assign({}, defaultForm);
        }
    },

    methods: {
        uploadImageSuccess(response, file, fileList) {
            this.postForm.image_id = response.data.id;
        },

        removeImage(file, fileList) {
            let id = file.id || file.response.data.id;
            removeFile(id);
            this.postForm.image_id = ''
        },

        fetchData(id) {
            fetchBannerItem(id)
                .then(response => {
                    let bannerItem = response.data[0];
                    if(bannerItem.url_type){
                        bannerItem.url_type = bannerItem.url_type.toString()
                    }                    
                    if (bannerItem.image !== null) {
                        this.fileList.push({
                            id: bannerItem.image.id,
                            name: bannerItem.image.client_name,
                            url: `${process.env.HOST}${bannerItem.image.url}`
                        })                        
                    }
                    this.postForm = bannerItem
                    console.log(this.postForm)
                })
                .catch(err => {
                    console.log(err);
                });
        },

        submitForm() {
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    let banner_id = this.$route.params && this.$route.params.banner_id;
                    //提交数据到服务器          
                    let data = {
                        banner_id,                        
                        ...this.postForm
                    };
                    // console.log(data);                    
                    if (!this.isEdit) {
                        createBannerItem(data).then(response => {
                            this.$notify({
                                title: "成功",
                                message: "发布成功",
                                type: "success",
                                duration: 2000
                            });
                            this.loading = false;
                            this.$router.push(`/banner/${banner_id}`)
                        });
                    } else {   
                        let banneritem_id = this.$route.params && this.$route.params.banneritem_id;      
                        updateBannerItem(banneritem_id, data).then(response => {
                            this.$notify({
                                title: "成功",
                                message: "更新成功",
                                type: "success",
                                duration: 2000
                            });
                            this.loading = false;
                            // this.$router.push(`/banner/${banner_id}`)
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
    .el-select,
    .el-tooltip {
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
