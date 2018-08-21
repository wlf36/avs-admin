<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name">
                            <MDinput name="name" v-model="postForm.name" required :maxlength="100">分类名称</MDinput>
                        </el-form-item>

                        <el-form-item prop="description">
                            <MDinput name="name" v-model="postForm.description">分类描述</MDinput>
                        </el-form-item>

                        <div style="margin-top:30px">
                            <el-button v-loading="loading" type="success" @click="submitForm">创建</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>

<script>
    import MDinput from "@/components/MDinput"
    import {
        createCategory,
        fetchCategory,
        updateCategory
    } from "@/api/category"

    export default {
        name: "CategoryDetail",
        components: {
            MDinput
        },
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
                        message: rule.field + "为必填项",
                        type: "error"
                    });
                    callback(null);
                } else {
                    callback();
                }
            };

            return {
                postForm: {
                    name: "",
                    description: "",
                    vocabulary_id: 1,
                    parent: 0
                },
                loading: false,
                rules: {
                    name: [{
                        validator: validateRequire
                    }]
                },
                category: []
            };
        },

        created() {
            if (this.isEdit) {
                const id = this.$route.params.category_id
                this.fetchData(id)
            }
            this.postForm.vocabulary_id = this.$route.params.vocabulary_id
            this.postForm.parent = this.$route.params.category_id
        },

        methods: {
            fetchData(id) {
                fetchCategory(id)
                    .then(response => {
                        this.postForm = response.data[0]
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
                        if (!this.isEdit) {
                            createCategory(data).then(response => {
                                this.$notify({
                                    title: "成功",
                                    message: "发布成功",
                                    type: "success",
                                    duration: 2000
                                });
                                this.loading = false;
                                this.$router.push(`/vocabulary/${this.postForm.vocabulary_id}`)
                            });
                        } else {
                            let id = this.$route.params.category_id;
                            updateCategory(id, data).then(response => {
                                this.$notify({
                                    title: "成功",
                                    message: "更新成功",
                                    type: "success",
                                    duration: 2000
                                });
                                this.loading = false;
                                this.$router.push(`/vocabulary/${this.postForm.vocabulary_id}`)
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
