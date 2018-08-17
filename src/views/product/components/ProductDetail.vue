<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
            <el-tabs v-model="activeTab" @tab-click="handleClick">

                <el-tab-pane label="基础信息" name="base">
                    <el-form-item prop="title">
                        <MDinput name="name" v-model="postForm.title" required :maxlength="100">商品名称</MDinput>
                    </el-form-item>
                    <el-form-item label="商品描述:">
                        <el-input type="textarea" class="article-textarea" :rows="3" placeholder="请输入内容" v-model="postForm.description">
                        </el-input>
                        <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
                    </el-form-item>
                    <el-form-item label="商品分类:">
                        <el-select v-model="postForm.category" multiple filterable placeholder="请输入分类名称" :filter-method="filterCat" @remove-tag="deleteCategory" :loading="loading">
                            <el-option v-for="item in catOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="up-container">
                        <el-upload ref="upload" :action="file_api" :auto-upload="true" :on-remove="removeImage" :on-success="uploadImageSuccess" :headers="headers" :file-list="fileList" list-type="picture">
                            <el-button size="small" type="primary">上传缩略图</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </div>
                    <div class="editor-container">
                        <Tinymce :height=400 ref="editor" v-model="postForm.body" />
                    </div>
                    <el-tooltip :content="'Switch value: ' + postForm.status" placement="top">
                        <el-switch v-model="postForm.status" active-text="是否发布" active-value="publish" inactive-value="draft">
                        </el-switch>
                    </el-tooltip>
                </el-tab-pane>

                <el-tab-pane label="商品信息" name="price">
                    <el-form-item prop="price">
                        <MDinput name="name" v-model="postForm.price">商品价格</MDinput>
                    </el-form-item>
                    <el-form-item prop="stock">
                        <MDinput name="name" v-model="postForm.stock">商品库存</MDinput>
                    </el-form-item>
                    <el-form-item label="商品tag标签:">
                        <el-select v-model="postForm.tag" multiple filterable placeholder="请输入tag标签" :filter-method="filterTag" @remove-tag="deleteTag" :loading="loading">
                            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="商品参数" name="info">
                    <div id="meta-container">
                        <el-row v-for="(item, index) in postForm.meta" :key="index" :gutter="20" style="position:relative">
                            <el-col :span="10">
                                <el-form-item prop="meta_key">
                                    <MDinput v-model="item.meta_key">属性名称</MDinput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="meta_value">
                                    <MDinput v-model="item.meta_value">属性值</MDinput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" style="position:absolute;bottom:22px; right:0">
                                <el-button type="primary" size="mini" circle @click="addMeta">
                                    <i class="el-icon-plus"></i>
                                </el-button>
                                <el-button type="danger" size="mini" circle @click="removeMeta(index)">
                                    <i class="el-icon-minus"></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <div style="margin-top:30px">
                <el-button v-loading="loading" type="success" @click="submitForm">发布</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload/singleImage3";
import MDinput from "@/components/MDinput";
import { validateURL } from "@/utils/validate";
import {
    createProduct,
    updateProduct,
    fetchProduct,
    removeCategory,
    removeTag
} from "@/api/product";
import { fetchCategories, getAllCategory } from "@/api/category";
import { fetchTags, getAllTag, fetchOrCreateTag } from "@/api/tag";
import { removeFile } from "@/api/file";
import { getToken } from "@/utils/auth";

const defaultForm = {
    title: "", // 文章题目
    description: "", // 文章摘要
    publish: 1,
    id: undefined,
    meta: [
        {
            meta_key: null,
            meta_value: null
        }
    ]
};

export default {
    name: "ProductDetail",
    components: { Tinymce, MDinput, Upload },
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
            activeTab: "base",
            headers: {
                Authorization: "Bearer " + getToken()
            },
            file_api: `${process.env.BASE_API}/image`,
            postForm: Object.assign({}, defaultForm),
            loading: false,
            rules: {
                title: [{ validator: validateRequire }]
            },
            imgId: [],
            fileList: [],
            total: 0,
            listQuery: {
                page: 1,
                limit: 10
            },
            categories: [],
            catOptions: [],
            tags: [],
            tagOptions: []
        };
    },
    computed: {
        contentShortLength() {
            return this.postForm.description.length;
        }
    },
    created() {
        getAllCategory().then(response => {
            const _category = response.data;
            this.categories = _category.map(item => {
                return { value: item.id, label: item.name };
            });
        });

        getAllTag().then(response => {
            const _tag = response.data;
            this.tags = _tag.map(item => {
                return { value: item.id, label: item.name };
            });
        });

        if (this.isEdit) {
            let id = this.$route.params.id;
            this.fetchData(id);
        } else {
            this.postForm = Object.assign({}, defaultForm);
        }
    },
    methods: {
        deleteCategory(category) {
            const id = this.$route.params.id;
            removeCategory(id, { category: category });
        },

        deleteTag(tag) {
            const id = this.$route.params.id;
            removeTag(id, { tag: tag });
        },

        filterCat(query) {
            if (query !== "") {
                this.catOptions = this.categories.filter(item => {
                    return item.label.indexOf(query) > -1;
                });
            } else {
                this.catOptions = [];
            }
        },

        filterTag(query) {
            if (query !== "") {
                this.tagOptions = this.tags.filter(item => {
                    return item.label.indexOf(query) > -1;
                });
            } else {
                this.tagOptions = [];
            }
        },

        addMeta() {
            this.postForm.meta.push({
                meta_key: null,
                meta_value: null
            });
        },

        removeMeta(index) {
            this.postForm.meta.splice(index, 1);
        },

        uploadImageSuccess(response, file, fileList) {
            this.image_id = response.data.id;
        },

        removeImage(file, fileList) {
            let id = file.id || file.response.data.id;
            removeFile(id);
        },

        fetchData(id) {
            fetchProduct(id)
                .then(response => {
                    let product = response.data[0];                    
                    product.category = product.category.map(item => {
                        return item.name;
                    });
                    product.tag = product.tag.map(item => {
                        return item.name;
                    });
                    if (product.image !== null) {
                        this.fileList.push({
                            id: product.image.id,
                            name: product.image.client_name,
                            url: `${process.env.HOST}${product.image.url}`
                        })                        
                    }
                    this.postForm = product;
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
                        ...this.postForm,
                        image_id: this.image_id
                    };
                    if (!this.isEdit) {
                        createProduct(data).then(response => {
                            this.$notify({
                                title: "成功",
                                message: "发布成功",
                                type: "success",
                                duration: 2000
                            });
                            this.loading = false;
                            this.$router.push("/product/list");
                        });
                    } else {
                        let id = this.$route.params.id;
                        updateProduct(id, data).then(response => {
                            this.$notify({
                                title: "成功",
                                message: "更新成功",
                                type: "success",
                                duration: 2000
                            });
                            this.loading = false;
                            this.$router.push("/product/list");
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
    padding: 30px;
    max-width: 980px;
    .el-select,
    .el-tooltip {
        display: block;
        margin-top: 30px;
    }
    .up-container {
        margin: 30px 0;
    }
    .editor-container {
        min-height: 500px;
        margin: 30px 0;
        border-right: 1px solid #c5c5c5;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
    }
    .word-counter {
        width: 40px;
        position: absolute;
        right: -10px;
        top: 0px;
    }
}
</style>
